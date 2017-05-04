var superagent = require('superagent');

describe('making an HTTP request', function() {
  it('works', function(done) {
    superagent.get('http://google.com').end(done);
  });
});
