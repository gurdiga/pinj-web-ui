'use strict';

var DOM = {
  require: function querySelector(selector, context) {
    context = context || document;

    var element = context.querySelector(selector);

    if (!element) throw new Error('DOM.require: element not found by selector: “' + selector + '”');

    return element;
  },

  clone: function(element) {
    var DEEP = true;
    return element.cloneNode(DEEP);
  },

  isVisible: function(element) {
    return element.offsetWidth > 0 && element.offsetHeight > 0;
  }
};

module.exports = DOM;
