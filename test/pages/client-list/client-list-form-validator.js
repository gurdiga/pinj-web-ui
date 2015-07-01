'use strict';

describe('ClientListFormValidator', function() {
  var validator;

  beforeEach(function() {
    validator = new ClientListFormValidator();
  });

  it('accepts an empty list', function() {
    expect(validate('')).to.be.resolved;
  });

  it('does not accept dots', function() {
    expect(validate('Some Name.')).to.be.rejectedWith(/Este recomandat să excludeţi semnele de punctuaţie/);
  });

  function validate(clientList) {
    return validator.validate({'client-list': clientList});
  }
});

var ClientListFormValidator = require('app/pages/client-list/client-list-form-validator');
