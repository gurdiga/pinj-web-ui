'use strict';

var inherits = require('inherits');
var PageWithForm = require('app/super/page-with-form');
var DOM = require('app/services/dom');
var FormValidationError = require('app/widgets/form-validation-error');
var SubmitButtonSpinner = require('app/widgets/submit-button-spinner');
var RegistrationForm = require('./registration-form');

inherits(RegistrationPage, PageWithForm);

function RegistrationPage(domElement, UserService) {
  var formDOMElement = DOM.require('#registration-form', domElement);
  var alreadyRegisteredMessageDOMElement = DOM.require('#already-registered', domElement);

  var formValidationError = new FormValidationError(formDOMElement);
  var submitButtonSpinner = new SubmitButtonSpinner(formDOMElement);
  var registrationForm = new RegistrationForm(formDOMElement, formValidationError, submitButtonSpinner, UserService);

  this.isFormRelevant = function() {
    return !UserService.isCurrentlyAuthenticated();
  };

  PageWithForm.call(this, domElement, registrationForm, formDOMElement, alreadyRegisteredMessageDOMElement);
}

module.exports = RegistrationPage;
