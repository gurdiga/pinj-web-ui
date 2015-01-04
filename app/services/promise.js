'use strict';

/*global Q*/

function Promise(f) {
  return Q.Promise(f);
}

Promise.resolve = Q.resolve;
Promise.reject = Q.reject;

module.exports = Promise;
