const UINT32 = 4;
const INT32 = 4;
const FLOAT = 4;
const CHAR = 1;
const MAX_VAR_UINT_32_BYTES = 5;

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
    this.print(FLOAT);
    this.index += FLOAT;

    return result;
  }

  /**
   * @return {Number} The unsigned 32-bit integer that we want
   */
  uint32() {
    const result = this.buffer.readUInt32LE(this.index);
    this.print(UINT32);

    this.index += UINT32;

    return result;
  }

  /**
   * @return {Number} The signed 32-bit integer that we want
   */
  int32() {
    const result = this.buffer.readInt32LE(this.index);
    this.print(INT32);

    this.index += INT32;

    return result;
  }

  /**
   * Read 1-5 bytes in order to extract a 32-bit unsigned value from the
   * stream. 7 data bits are extracted from each byte with the 8th bit used
   * to indicate whether the loop should continue.
   * This allows variable size numbers to be stored with tolerable
   * efficiency. Numbers sizes that can be stored for various numbers of
   * encoded bits are:
   *
   *  8-bits: 0-127
   * 16-bits: 128-16383
   * 24-bits: 16384-2097151
   * 32-bits: 2097152-268435455
   * 40-bits: 268435456-0xFFFFFFFF
   *
   * Ported from https://github.com/ValveSoftware/csgo-demoinfo/blob/master/demoinfogo/demofilebitbuf.cpp#L332-L361
   */
  varuint32() {
    let result = 0;
    let count = 0;
    let b;

    do {
      if (count === MAX_VAR_UINT_32_BYTES) {
        return result;
      }

      b = this.char();

      // b & 0x7F gives you 7 bits of the byte because the most significant bit
      // is reserved for communicating whether subsequent bytes have the next bits
      // of the number.
      //
      // the entire statement puts the 7 bits of the byte in the 7 most significant
      // positions of `result`.
      result |= (b & 0x7F) << (7 * count);

      // easiest way to cast a signed int to an unsigned int
      result = new Uint32Array([result])[0];
      count++;

      // AND with 128 because this checks if the most significant bit is set.
      // if the most significant bit is set, that means that the next byte
      // will contain the next 7-bits of the number
    } while (b & 0x80);

    return result;
  }

  /**
   * @return {Number} The unsigned 8-bit integer that we want
   * I should probably rename this to uint8.
   */
  char() {
    const result = this.buffer.readUInt8(this.index);
    this.print(CHAR);
    this.index += CHAR;

    return result;
  }

  next() {
    const result = this.buffer.readUInt8(this.index);
    console.log(result, String.fromCharCode(result));

    this.index += CHAR;

    return result;
  }

  skip(length) {
    this.index += length;
  }

  /**
   * Creates a new buffer from the buffer reader's current index to the specified length.
   * This method will automatically advance the index of the buffer reader by LENGTH
   * after it returns the new buffer.
   *
   * @param {Number} length The number of bytes to put in the new buffer
   * @returns {Buffer} A buffer filled from bytes from the current index to the given length
   */
  from(length) {
    const result = Buffer.from(this.buffer, this.index, length);
    this.index += length;

    return result;
  }

  copy(target, end) {
    this.buffer.copy(target, 0, this.index, this.index+end);
    this.index += end;
  }

  print(length) {
    for (var i = this.index; i < this.index + length; i++) {
      // console.log('reader:', this.buffer[i]);
    }
  }
}
