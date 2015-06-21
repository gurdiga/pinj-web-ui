'use strict';

var FormValidator = require('app/super/form-validator');
var inherits = require('inherits');

inherits(PasswordChangeFormValidator, FormValidator);

function PasswordChangeFormValidator() {
  FormValidator.call(this);

  this.getRequirements = function() {
    return [{
      'message': 'Este necesar să introduceţi parola curentă',
      'fulfilled': function(data) {
        return data['current-password'] && !!data['current-password'].trim();
      }
    }, {
      'message': 'Este necesar să introduceţi parola nouă',
      'fulfilled': function(data) {
        return data['new-password'] && !!data['new-password'].trim();
      }
    }, {
      'message': 'Este necesar să confirmaţi parola nouă',
      'fulfilled': function(data) {
        return data['new-password-confirmation'] && !!data['new-password-confirmation'];
      }
    }, {
      'message': 'Confirmarea parolei nu corespunde',
      'fulfilled': function(data) {
        return data['new-password'] === data['new-password-confirmation'];
      }
    }];
  };
}

module.exports = PasswordChangeFormValidator;
