'use strict';

var Form = require('app/super/form');
var inherits = require('inherits');
var EventEmitter = require('events').EventEmitter;
var PasswordRecoveryFormValidator = require('./password-recovery-form-validator');

inherits(PasswordRecoveryForm, Form);
inherits(PasswordRecoveryForm, EventEmitter);

function PasswordRecoveryForm(domElement, formValidationError, submitButtonSpinner, userData, email) {
  var context = this;
  var emailField = domElement['email'];

  emailField.value = email;

  this.getEmail = function() {
    return emailField.value;
  };

  this.requiredFields = ['email'];

  this.processForm = function(formData) {
    return sendPasswordRecoveryEmail()
    .then(submitForm);

    function sendPasswordRecoveryEmail() {
      return userData.sendPasswordRecoveryEmail(formData.email);
    }

    function submitForm() {
      context.emit('submit');
    }
  };

  var formValidator = new PasswordRecoveryFormValidator();

  Form.call(this, domElement, formValidator, formValidationError, submitButtonSpinner);
  EventEmitter.call(this);
}

module.exports = PasswordRecoveryForm;
