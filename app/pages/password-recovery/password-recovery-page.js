'use strict';

var inherits = require('inherits');
var PageWithForm = require('app/super/page-with-form');
var DOM = require('app/services/dom');
var PasswordRecoveryForm = require('./password-recovery-form');
var FormValidationError = require('app/widgets/form-validation-error');
var SubmitButtonSpinner = require('app/widgets/submit-button-spinner');
var isValidEmail = require('app/util/is-valid-email');

inherits(PasswordRecoveryPage, PageWithForm);

function PasswordRecoveryPage(domElement, userData) {
  var formDOMElement = DOM.require('#password-recovery-form', domElement);
  var successMessageDOMElement = DOM.require('#success-message', domElement);

  var formValidationError = new FormValidationError(formDOMElement);
  var submitButtonSpinner = new SubmitButtonSpinner(formDOMElement);
  var emailFromAuthenticationForm = getEmailFromQueryString(location);
  var passwordRecoveryForm = new PasswordRecoveryForm(formDOMElement, formValidationError, submitButtonSpinner, userData, emailFromAuthenticationForm);

  passwordRecoveryForm.on('submit', showSuccessMessage);

  this.isFormRelevant = function() {
    return successMessageDOMElement.style.display !== 'block';
  };

  PageWithForm.call(this, domElement, passwordRecoveryForm, formDOMElement, successMessageDOMElement);

  this.submitForm = function(data) {
    return passwordRecoveryForm.submit(data)
    .then(showSuccessMessage);
  };

  function showSuccessMessage() {
    successMessageDOMElement.style.display = 'block';
    formDOMElement.style.display = 'none';
  }

  function getEmailFromQueryString(location) {
    var queryString = location.search;
    if (!queryString) return '';

    var hasEmail = location.search.match('email=([^&]*)');
    if (!hasEmail) return '';

    var email = decodeURIComponent(hasEmail[1]);
    if (!isValidEmail(email)) return '';

    return email;
  }

  this.getEmailFromQueryString = getEmailFromQueryString;
}

module.exports = PasswordRecoveryPage;
