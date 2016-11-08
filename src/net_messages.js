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

const NET_MESSAGES = netMessagesBuilder.build('NET_Messages');
const SVC_MESSAGES = netMessagesBuilder.build('SVC_Messages');

const enumKeyToMessageIdMap = {
  [NET_MESSAGES.net_NOP]: 'CNETMsg_NOP',
  [NET_MESSAGES.net_Disconnect]: 'CNETMsg_Disconnect',
  [NET_MESSAGES.net_File]: 'CNETMsg_File',
  [NET_MESSAGES.net_Tick]: 'CNETMsg_Tick',
  [NET_MESSAGES.net_StringCmd]: 'CNETMsg_StringCmd',
  [NET_MESSAGES.net_SetConVar]: 'CNETMsg_SetConVar',
  [NET_MESSAGES.net_SignonState]: 'CNETMsg_SignonState',
  [SVC_MESSAGES.svc_ServerInfo]: 'CSVCMsg_ServerInfo',
  [SVC_MESSAGES.svc_SendTable]: 'CSVCMsg_SendTable',
  [SVC_MESSAGES.svc_ClassInfo]: 'CSVCMsg_ClassInfo',
  [SVC_MESSAGES.svc_SetPause]: 'CSVCMsg_SetPause',
  [SVC_MESSAGES.svc_CreateStringTable]: 'CSVCMsg_CreateStringTable',
  [SVC_MESSAGES.svc_UpdateStringTable]: 'CSVCMsg_UpdateStringTable',
  [SVC_MESSAGES.svc_VoiceInit]: 'CSVCMsg_VoiceInit',
  [SVC_MESSAGES.svc_VoiceData]: 'CSVCMsg_VoiceData',
  [SVC_MESSAGES.svc_Print]: 'CSVCMsg_Print',
  [SVC_MESSAGES.svc_Sounds]: 'CSVCMsg_Sounds',
  [SVC_MESSAGES.svc_SetView]: 'CSVCMsg_SetView',
  [SVC_MESSAGES.svc_FixAngle]: 'CSVCMsg_FixAngle',
  [SVC_MESSAGES.svc_CrosshairAngle]: 'CSVCMsg_CrosshairAngle',
  [SVC_MESSAGES.svc_BSPDecal]: 'CSVCMsg_BSPDecal',
  [SVC_MESSAGES.svc_UserMessage]: 'CSVCMsg_UserMessage',
  [SVC_MESSAGES.svc_GameEvent]: 'CSVCMsg_GameEvent',
  [SVC_MESSAGES.svc_PacketEntities]: 'CSVCMsg_PacketEntities',
  [SVC_MESSAGES.svc_TempEntities]: 'CSVCMsg_TempEntities',
  [SVC_MESSAGES.svc_Prefetch]: 'CSVCMsg_Prefetch',
  [SVC_MESSAGES.svc_Menu]: 'CSVCMsg_Menu',
  [SVC_MESSAGES.svc_GameEventList]: 'CSVCMsg_GameEventList',
  [SVC_MESSAGES.svc_GetCvarValue]: 'CSVCMsg_GetCvarValue'
};

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

class NetMessages {
  constructor() {
    const netMessages = buildNetMessages({});

    this.messages = buildServiceMessages(netMessages);
  }

  get(enumKey) {
    const messageId = enumKeyToMessageIdMap[enumKey];

    return this.messages[messageId];
  }
}

export default new NetMessages();
