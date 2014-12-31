'use strict';

var DOM = require('app/services/dom');
var Form = require('app/super/form');
var inherits = require('inherits');
var AuthenticationFormValidator = require('./authentication-form-validator');
var PasswordRecoveryPage = require('app/pages/password-recovery/password-recovery-page');

inherits(AuthenticationForm, Form);

function AuthenticationForm(domElement, formValidationError, submitButtonSpinner, userData) {
  this.requiredFields = ['email', 'password'];

  this.processForm = function(formData) {
    return authenticateUser()
    .then(submitForm);

    function authenticateUser() {
      return userData.authenticateUser(formData.email, formData.password);
    }

    function submitForm() {
      domElement.submit();
    }
  };

  var passwordRecoveryLink = DOM.require('#password-recovery', domElement);
  var passwordField = DOM.require('input[name="password"]', domElement);

  passwordRecoveryLink.addEventListener('click', function(event) {
    event.preventDefault();
    submitEmailToPasswordRecoveryPage();
  });

  function submitEmailToPasswordRecoveryPage() {
    domElement.method = 'GET';
    domElement.action = PasswordRecoveryPage.PATH;
    passwordField.value = '';
    domElement.submit();
  }

  this.submitEmailToPasswordRecoveryPage = submitEmailToPasswordRecoveryPage;

  var formValidator = new AuthenticationFormValidator();

  Form.call(this, domElement, formValidator, formValidationError, submitButtonSpinner);
}

module.exports = AuthenticationForm;
