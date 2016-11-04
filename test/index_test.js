import './setup';
import say from '../src/index';

describe('./src/index', function() {
    it('says hello', function() {
        expect(say('scott')).to.equal('hello scott');
    });
});
