import './setup';
import BufferReader from '../src/buffer_reader';

describe('./src/buffer_reader', function() {
  describe('#varuint32', function() {
    it('handles 8-bits', function() {
      const reader = new BufferReader(Buffer.from([127]));

      expect(reader.varuint32()).to.equal(127);
    });

    it('handles 16-bits', function() {
      const reader = new BufferReader(Buffer.from([255, 127]));

      expect(reader.varuint32()).to.equal(16383);
    });

    it('handles 24-bits', function() {
      const reader = new BufferReader(Buffer.from([255, 255, 127]));

      expect(reader.varuint32()).to.equal(2097151);
    });

    it('handles 32-bits', function() {
      const reader = new BufferReader(Buffer.from([255, 255, 255, 127]));

      expect(reader.varuint32()).to.equal(268435455);
    });

    it('handles 40-bits', function() {
      const reader = new BufferReader(Buffer.from([255, 255, 255, 255, 127]));

      expect(reader.varuint32()).to.equal(0xFFFFFFFF);
    });

    it('can form a 32-bit integer', function() {
      const reader = new BufferReader(Buffer.from([255, 255, 255, 255, 15]));

      expect(reader.varuint32()).to.equal(Math.pow(2, 32) - 1);
		});
  });
});
