'use strict';

var FormValidator = require('app/super/form-validator');
var isValidEmail = require('app/util/is-valid-email');
var inherits = require('inherits');

inherits(PasswordValidationFormValidator, FormValidator);

function PasswordValidationFormValidator() {
  FormValidator.call(this);

  this.getRequirements = function() {
    return [{
      'message': 'Adresa de email lipseşte.',
      'fulfilled': function(data) {
        return data['email'] && !!data['email'].trim();
      }
    }, {
      'message': 'Adresa de email este incorectă sintactic.',
      'fulfilled': function(data) {
        return isValidEmail(data['email']);
      }
    }];
  };
}

module.exports = PasswordValidationFormValidator;
