'use strict';

/*global Q*/

function Promise(f) {
  return Q.Promise(f);
}

Promise.resolve = Q.resolve;
Promise.reject = Q.reject;
Promise.nextTick = function() {
  return Q.delay(0);
};
Promise.all = Q.all;

module.exports = Promise;
