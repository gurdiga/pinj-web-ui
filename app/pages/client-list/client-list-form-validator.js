'use strict';

var FormValidator = require('app/super/form-validator');
var inherits = require('inherits');

inherits(ClientListFormValidator, FormValidator);

var PUNCTUATION_RE = /\./;

function ClientListFormValidator() {
  FormValidator.call(this);

  this.getRequirements = function() {
    return [{
      'message': 'Este recomandat să excludeţi semnele de punctuaţie',
      'fulfilled': function(data) {
        return !PUNCTUATION_RE.test(data['client-list']);
      }
    }];
  };
}

module.exports = ClientListFormValidator;
