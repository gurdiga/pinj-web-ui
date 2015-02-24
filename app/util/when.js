'use strict';

module.exports = when;

function when(domElement, eventName) {
  return new Promise(function(resolve) {
    domElement.addEventListener(eventName, resolve);
  });
}

var Promise = require('app/services/promise');
