'use strict';

var inherits = require('inherits');
var PageWithForm = require('app/super/page-with-form');
var Navigation = require('app/widgets/navigation');
var DOM = require('app/services/dom');
var FormValidationError = require('app/widgets/form-validation-error');
var SubmitButtonSpinner = require('app/widgets/submit-button-spinner');
var AuthenticationForm = require('./authentication-form');

inherits(IndexPage, PageWithForm);

function IndexPage(domElement, userData) {
  var navigationDOMElement = DOM.require('nav', domElement);
  new Navigation(navigationDOMElement, userData);

  var formDOMElement = DOM.require('#authentication-form', domElement);
  var alreadyAuthenticatedMessageDOMElement = DOM.require('#already-authenticated', domElement);

  var formValidationError = new FormValidationError(formDOMElement);
  var submitButtonSpinner = new SubmitButtonSpinner(formDOMElement);
  var authenticationForm = new AuthenticationForm(formDOMElement, formValidationError, submitButtonSpinner, userData);

  this.isFormRelevant = function() {
    return !userData.isCurrentlyAuthenticated();
  };

  PageWithForm.call(this, domElement, authenticationForm, formDOMElement, alreadyAuthenticatedMessageDOMElement);
}

module.exports = IndexPage;
