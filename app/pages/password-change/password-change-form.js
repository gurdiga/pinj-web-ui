'use strict';

var Form = require('app/super/form');
var inherits = require('inherits');
var PasswordChangeFormValidator = require('app/pages/password-change/password-change-form-validator');

inherits(PasswordChangeForm, Form);

function PasswordChangeForm(domElement, formValidationError, submitButtonSpinner, userData) {
  this.requiredFields = ['old-password', 'new-password', 'new-password-confirmation'];

  this.processForm = function(formData) {
    return userData.changePassword(
      formData['old-password'],
      formData['new-password']
    );
  };

  var formValidator = new PasswordChangeFormValidator();

  Form.call(this, domElement, formValidator, formValidationError, submitButtonSpinner);
}

module.exports = PasswordChangeForm;
