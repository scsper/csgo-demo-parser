import ProtoBuf from 'protobufjs';

const netMessagesBuilder = ProtoBuf.loadProtoFile('./src/protobuf/netmessages_public.proto');

const NetMessageIds = [
  'CNETMsg_Tick',
  'CNETMsg_StringCmd',
  'CNETMsg_SignonState',
  'CNETMsg_SetConVar',
  'CNETMsg_NOP',
  'CNETMsg_Disconnect',
  'CNETMsg_File'
];

const ServiceMessageIds = [
  'CSVCMsg_ServerInfo',
  'CSVCMsg_ClassInfo',
  'CSVCMsg_SendTable',
  'CSVCMsg_Print',
  'CSVCMsg_SetPause',
  'CSVCMsg_SetView',
  'CSVCMsg_CreateStringTable',
  'CSVCMsg_UpdateStringTable',
  'CSVCMsg_VoiceInit',
  'CSVCMsg_VoiceData',
  'CSVCMsg_FixAngle',
  'CSVCMsg_CrosshairAngle',
  'CSVCMsg_Prefetch',
  'CSVCMsg_BSPDecal',
  'CSVCMsg_GetCvarValue',
  'CSVCMsg_Menu',
  'CSVCMsg_UserMessage',
  'CSVCMsg_GameEvent',
  'CSVCMsg_GameEventList',
  'CSVCMsg_TempEntities',
  'CSVCMsg_PacketEntities',
  'CSVCMsg_Sounds'
];

const enumKeyToMessageIdMap = {
  net_NOP: 'CNETMsg_NOP',
  net_Disconnect: 'CNETMsg_Disconnect',
  net_File: 'CNETMsg_File',
  net_Tick: 'CNETMsg_Tick',
  net_StringCmd: 'CNETMsg_StringCmd',
  net_SetConVar: 'CNETMsg_SetConVar',
  net_SignonState: 'CNETMsg_SignonState',
  svc_ServerInfo: 'CSVCMsg_ServerInfo',
  svc_SendTable: 'CSVCMsg_SendTable',
  svc_ClassInfo: 'CSVCMsg_ClassInfo',
  svc_SetPause: 'CSVCMsg_SetPause',
  svc_CreateStringTable: 'CSVCMsg_CreateStringTable',
  svc_UpdateStringTable: 'CSVCMsg_UpdateStringTable',
  svc_VoiceInit: 'CSVCMsg_VoiceInit',
  svc_VoiceData: 'CSVCMsg_VoiceData',
  svc_Print: 'CSVCMsg_Print',
  svc_Sounds: 'CSVCMsg_Sounds',
  svc_SetView: 'CSVCMsg_SetView',
  svc_FixAngle: 'CSVCMsg_FixAngle',
  svc_CrosshairAngle: 'CSVCMsg_CrosshairAngle',
  svc_BSPDecal: 'CSVCMsg_BSPDecal',
  svc_UserMessage: 'CSVCMsg_UserMessage',
  svc_GameEvent: 'CSVCMsg_GameEvent',
  svc_PacketEntities: 'CSVCMsg_PacketEntities',
  svc_TempEntities: 'CSVCMsg_TempEntities',
  svc_Prefetch: 'CSVCMsg_Prefetch',
  svc_Menu: 'CSVCMsg_Menu',
  svc_GameEventList: 'CSVCMsg_GameEventList',
  svc_GetCvarValue: 'CSVCMsg_GetCvarValue'
};

const NET_MESSAGES = netMessagesBuilder.build('NET_Messages');
const SVC_MESSAGES = netMessagesBuilder.build('SVC_Messages');

function buildNetMessages(initialValue) {
  return NetMessageIds.reduce((netMessages, key) => {
    netMessages[key] = netMessagesBuilder.build(key);

    return netMessages;
  }, initialValue);
}

function buildServiceMessages(initialValue) {
  return ServiceMessageIds.reduce((serviceMessages, key) => {
    serviceMessages[key] = netMessagesBuilder.build(key);

    return serviceMessages;
  }, initialValue);
}

export default class NetMessage {
  constructor() {
    const netMessages = buildNetMessages({});

    this.messages = buildServiceMessages(netMessages);
  }

  get(enumKey) {
    const messageId = enumKeyToMessageIdMap[enumKey];

    return this.messages[messageId];
  }
}
