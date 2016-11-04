const UINT32 = 4;
const INT32 = 4;
const FLOAT = 4;
const CHAR = 1;

export default class BufferReader {
  constructor(buffer) {
    this.index = 0;
    this.buffer = buffer;
  }

  /**
   * @param {Number} length The length of the string you want to get.
   * @return {String} The string that we want
   */
  string(length) {
    // We will be using 'utf8' in all cases for this program, so we'll just hardcode it.
    // We split on the null character because the string won't always fill up the length given.
    const result = this.buffer.toString('utf8', this.index, this.index + length).split('\u0000')[0];
    this.index += length;

    return result;
  }

  /**
   * @return {Number} The float that we want
   */
  float() {
    // CSGO demos use little endian.  Big endian gives the wrong result.
    const result = this.buffer.readFloatLE(this.index);
    this.index += FLOAT;

    return result;
  }

  /**
   * @return {Number} The unsigned 32-bit integer that we want
   */
  uint32() {
    const result = this.buffer.readUInt32LE(this.index);
    this.index += UINT32;

    return result;
  }

  int32() {
    const result = this.buffer.readInt32LE(this.index);
    this.index += INT32;

    return result;
  }

  char() {
    const result = this.buffer.readUInt8(this.index);
    this.index += CHAR;

    return result;
  }
}