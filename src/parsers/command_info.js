/**
 * Not sure what this is helpful for.
 * It doesn't look like it's used for anything in the official demo parser released by Valve:
 * https://github.com/ValveSoftware/csgo-demoinfo/blob/master/demoinfogo/demofiledump.cpp#L1376-L1389
 */
export default function parseCommandInfo(bufferReader) {
  return [
    parseSplit(bufferReader),
    parseSplit(bufferReader)
  ];
}

function parseSplit(bufferReader) {
  return {
    flags: bufferReader.int32(),
    viewOrigin: parseVector(bufferReader),
    viewAngles: parseQAngle(bufferReader),
    localViewAngles: parseQAngle(bufferReader),

    // resampled origin / angles
    viewOrigin2: parseVector(bufferReader),
    viewAngles2: parseQAngle(bufferReader),
    localViewAngles2: parseQAngle(bufferReader)
  };
}

/**
 * An angle in the Source engine.
 */
function parseQAngle(bufferReader) {
  return parseVector(bufferReader);
}

function parseVector(bufferReader) {
  return {
    x: bufferReader.float(),
    y: bufferReader.float(),
    z: bufferReader.float()
  };
}