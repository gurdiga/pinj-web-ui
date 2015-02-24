'use strict';

module.exports = emit;

function emit(domElement, eventName) {
  return function() {
    domElement.dispatchEvent(new window.Event(eventName));
  };
}
