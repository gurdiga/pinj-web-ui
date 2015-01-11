'use strict';

var Navigation = require('app/widgets/navigation');
var LogoutLink = require('app/widgets/logout-link');
var DOM = require('app/services/dom');

function PageWithNavigation(domElement, userData) {
  var navigationDOMElement = DOM.require('nav', domElement);
  new Navigation(navigationDOMElement, userData);

  var logoutLinkDOMElement = DOM.require('nav a#logout', domElement);
  new LogoutLink(logoutLinkDOMElement, userData);
}

module.exports = PageWithNavigation;
