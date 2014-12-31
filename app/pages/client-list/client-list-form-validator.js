'use strict';

var FormValidator = require('app/super/form-validator');
var inherits = require('inherits');

inherits(ClientListFormValidator, FormValidator);

function ClientListFormValidator() {
  FormValidator.call(this);

  this.getRequirements = function() {
    return [
      // TODO?
    ];
  };
}

module.exports = ClientListFormValidator;
