'use strict';

var inherits = require('inherits');
var PageWithForm = require('app/super/page-with-form');
var PageWithNavigation = require('app/super/page-with-navigation');
var DOM = require('app/services/dom');
var FormValidationError = require('app/widgets/form-validation-error');
var SubmitButtonSpinner = require('app/widgets/submit-button-spinner');
var AuthenticationForm = require('./authentication-form');

inherits(IndexPage, PageWithForm);
inherits(IndexPage, PageWithNavigation);

function IndexPage(domElement, userData) {
  var formDOMElement = DOM.require('#authentication-form', domElement);
  var alreadyAuthenticatedMessageDOMElement = DOM.require('#already-authenticated', domElement);

  var formValidationError = new FormValidationError(formDOMElement);
  var submitButtonSpinner = new SubmitButtonSpinner(formDOMElement);
  var authenticationForm = new AuthenticationForm(formDOMElement, formValidationError, submitButtonSpinner, userData);

  this.isFormRelevant = function() {
    return !userData.isCurrentlyAuthenticated();
  };

  PageWithForm.call(this, domElement, authenticationForm, formDOMElement, alreadyAuthenticatedMessageDOMElement);
  PageWithNavigation.call(this, domElement, userData);
}

module.exports = IndexPage;
