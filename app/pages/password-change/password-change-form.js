'use strict';

var Form = require('app/super/form');
var inherits = require('inherits');
var PasswordChangeFormValidator = require('app/pages/password-change/password-change-form-validator');

inherits(PasswordChangeForm, Form);

function PasswordChangeForm(domElement, formValidationError, formSuccessMessage, submitButtonSpinner, userData) {
  this.requiredFields = ['old-password', 'new-password', 'new-password-confirmation'];

  this.processForm = function(formData) {
    formSuccessMessage.hide();

    return userData.changePassword(
      formData['old-password'],
      formData['new-password']
    )
    .then(function() {
      clearFields();
      formSuccessMessage.show('Parola a fost schimbată cu success.');
    });
  };

  var formValidator = new PasswordChangeFormValidator();

  Form.call(this, domElement, formValidator, formValidationError, submitButtonSpinner);

  function clearFields() {
    domElement['old-password'].value = '';
    domElement['new-password'].value = '';
    domElement['new-password-confirmation'].value = '';
  }
}

module.exports = PasswordChangeForm;
