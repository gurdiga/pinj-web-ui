'use strict';

var Promise = require('app/services/promise');

describe('Promise', function() {
  it('can resolve and then', function(done) {
    var value = 42;

    new Promise(function(resolve) { resolve(value); })
    .then(function(resolvedValue) {
      expect(resolvedValue).to.equal(value);
      done();
    })
    .catch(done);
  });

  it('can reject and catch', function(done) {
    var error = new Error('Something bad happened');

    new Promise(function(resolve, reject) { reject(error); })
    .catch(function(rejectedError) {
      expect(rejectedError).to.equal(error);
      done();
    })
    .catch(done);
  });

  it('can wait for the next tick', function(done) {
    var eventLoopTurned = false;

    Promise.resolve().then(function() {
      eventLoopTurned = true;
    });

    Promise.nextTick().then(function() {
      expect(eventLoopTurned).to.be.true;
      done();
    });
  });
});
