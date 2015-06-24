'use strict';

var PasswordChangeFormValidator = require('app/pages/password-change/password-change-form-validator');

describe('PasswordChangeFormValidator', function() {
  var validator;

  beforeEach(function() {
    validator = new PasswordChangeFormValidator();
  });

  it('rejects missing current password', function() {
    expect(validator.validate({
      'old-password': '',
      'new-password': '',
      'new-password-confirmation': ''
    })).to.be.rejectedWith('Este necesar să introduceţi parola curentă');
  });

  it('rejects missing new password', function() {
    return expect(validator.validate({
      'old-password': 'some-old-password',
      'new-password': '',
      'new-password-confirmation': ''
    })).to.be.rejectedWith('Este necesar să introduceţi parola nouă');
  });

  it('rejects missing new password confirmation', function() {
    return expect(validator.validate({
      'old-password': 'some-old-password',
      'new-password': 'some-new-password',
      'new-password-confirmation': ''
    })).to.be.rejectedWith('Este necesar să confirmaţi parola nouă');
  });

  it('rejects incorrect new password confirmation', function() {
    return expect(validator.validate({
      'old-password': 'some-old-password',
      'new-password': 'some-new-password',
      'new-password-confirmation': 'incorrect password confirmation'
    })).to.be.rejectedWith('Confirmarea parolei nu corespunde');
  });
});
