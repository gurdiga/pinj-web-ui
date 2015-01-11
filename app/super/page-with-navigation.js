'use strict';

var Navigation = require('app/widgets/navigation');
var DOM = require('app/services/dom');

function PageWithNavigation(domElement, userData) {
  var navigationDOMElement = DOM.require('nav', domElement);
  new Navigation(navigationDOMElement, userData);
}

module.exports = PageWithNavigation;
