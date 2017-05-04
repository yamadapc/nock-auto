var child_process = require('child_process');
var path = require('path');

require('..');

describe('nock-auto', function() {
  describe('when NOCK_AUTO===record', function() {
    require('./sample-project/test/index.test.js');

    describe('after tests run', function() {
      it('records HTTP fixtures and writes them to a file', function() {
      });
    });
  });

  describe('when NOCK_AUTO!==record', function() {
    it('just loads fixtures from the fixtures file');

    describe('when NOCK_AUTO_FILE===./something.js', function() {
      it('writes loads fixtures from `something.js`');
    });
  });
});
