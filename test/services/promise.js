'use strict';

describe('Promise', function() {
  it('can resolve with a given value and then', function() {
    var value = 42;

    return new Promise(function(resolve) { resolve(value); })
    .then(function(resolvedValue) {
      expect(resolvedValue).to.equal(value);
    });
  });

  it('can reject with a given error and catch', function() {
    var error = new Error('Something bad happened');

    new Promise(function(resolve, reject) { reject(error); })
    .catch(function(rejectedError) {
      expect(rejectedError).to.equal(error);
    });
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

  it('can combine promises', function(done) {
    var promise1 = new Promise(function(resolve) {
      setTimeout(function() { resolve(); }, 20);
    });

    var promise2 = new Promise(function(resolve) {
      setTimeout(function() { resolve(); }, 10);
    });

    var startTime = Date.now();

    Promise.all([promise1, promise2])
    .then(function() {
      var elapsedTime = Date.now() - startTime;
      expect(elapsedTime).to.be.at.least(20);

      done();
    });
  });
});

var Promise = require('app/services/promise');
