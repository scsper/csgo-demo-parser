import fs from 'fs';
import Protobuf from 'protobufjs';

import BufferReader from './buffer_reader';
import {DemoMessages} from './constants';

const DEMO_PATH = './demos/mirage_30.dem';
const netMessagesBuilder = Protobuf.loadProtoFile('./protobuf/netmessages_public.proto');

const demoBuffer = fs.readFileSync(DEMO_PATH);

function parseDemoHeader(bufferReader) {
  const MAX_OSPATH = 260;

  const filestamp = bufferReader.string(8);
  const demoProtocol = bufferReader.uint32();
  const networkProtocol = bufferReader.uint32();
  const serverName = bufferReader.string(MAX_OSPATH);
  const clientName = bufferReader.string(MAX_OSPATH);
  const mapName = bufferReader.string(MAX_OSPATH);
  const gameDirectory = bufferReader.string(MAX_OSPATH);
  const playbackTime = bufferReader.float();
  const playbackTicks = bufferReader.uint32();
  const playbackFrames = bufferReader.uint32();
  const signOnLength = bufferReader.uint32();

  return {
    filestamp,
    demoProtocol,
    networkProtocol,
    serverName,
    clientName,
    mapName,
    gameDirectory,
    playbackTime,
    playbackTicks,
    playbackFrames,
    signOnLength
  };
}

function parseCommandHeader(bufferReader) {
  return {
    command: bufferReader.char(),
    tick: bufferReader.int32(),
    playerSlot: bufferReader.char()
  };
}

function readDemo() {
  const bufferReader = new BufferReader(demoBuffer);
  const demoHeader = parseDemoHeader(bufferReader);

  let isDemoFinished = false;

  while (!isDemoFinished) {
    const {command, tick, playerSlot} = parseCommandHeader(bufferReader);

    switch (command) {
      case DemoMessages.STOP:
        isDemoFinished = true;
        break;

      case DemoMessages.CONSOLE_COMMAND:
        // not implemented yet
        break;

      case DemoMessages.DATA_TABLES:
        // not implemented yet
        break;

      case DemoMessages.STRING_TABLES:
        // not implemented yet
        break;

      case DemoMessages.USER_COMMAND:
        // not implemented yet
        break;

      case DemoMessages.SIGN_ON:
      case DemoMessages.PACKET:
        // not implemented yet
        break;

      default:
        break;




    }
  }
}

readDemo();