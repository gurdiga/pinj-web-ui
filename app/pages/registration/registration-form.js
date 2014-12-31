'use strict';

var Form = require('app/super/form');
var inherits = require('inherits');
var RegistrationFormValidator = require('./registration-form-validator');

inherits(RegistrationForm, Form);

function RegistrationForm(domElement, formValidationError, submitButtonSpinner, userData) {
  this.requiredFields = ['email', 'password', 'password-confirmation'];

  this.processForm = function(formData) {
    return registerUser()
    .then(authenticateRegisteredUser)
    .then(submitForm);

    function registerUser() {
      return userData.registerUser(formData.email, formData.password);
    }

    function authenticateRegisteredUser() {
      return userData.authenticateUser(formData.email, formData.password);
    }

    function submitForm() {
      domElement.submit();
    }
  };

  var formValidator = new RegistrationFormValidator();

  Form.call(this, domElement, formValidator, formValidationError, submitButtonSpinner);
}

module.exports = RegistrationForm;
