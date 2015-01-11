'use strict';

var inherits = require('inherits');
var PageWithNavigation = require('app/super/page-with-navigation');

inherits(TermsPage, PageWithNavigation);

function TermsPage(domElement, userData) {
  PageWithNavigation.call(this, domElement, userData);
}

module.exports = TermsPage;
