'use strict';

var FormValidator = require('app/super/form-validator');
var isValidEmail = require('app/util/is-valid-email');
var inherits = require('inherits');

inherits(RegistrationFormValidator, FormValidator);

function RegistrationFormValidator() {
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
    }, {
      'message': 'Parola lipseşte.',
      'fulfilled': function(data) {
        return data['password'] && !!data['password'];
      }
    }, {
      'message': 'Confirmarea parolei este incorectă.',
      'fulfilled': function(data) {
        return data['password'] === data['password-confirmation'];
      }
    }];
  };
}

module.exports = RegistrationFormValidator;
