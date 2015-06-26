'use strict';

describe('RegistrationFormValidator', function() {
  var validator;

  beforeEach(function() {
    validator = new RegistrationFormValidator();
  });

  it('rejects empty email', function() {
    expect(validator.validate({
      'email': '',
      'password': 'P4ssw0rd!',
      'password-confirmation': 'P4ssw0rd!'
    })).to.be.rejectedWith('Adresa de email lipseşte');
  });

  it('rejects syntactically incorrect email', function() {
    expect(validator.validate({
      'email': 'garbage',
      'password': 'P4ssw0rd!',
      'password-confirmation': 'P4ssw0rd!'
    })).to.be.rejectedWith('Adresa de email este incorectă sintactic');
  });

  it('rejects empty password', function() {
    expect(validator.validate({
      'email': 'test@test.com',
      'password': '',
      'password-confirmation': ''
    })).to.be.rejectedWith('Parola lipseşte');
  });

  it('rejects incorrect password confirmation', function() {
    expect(validator.validate({
      'email': 'test@test.com',
      'password': 'P4ssw0rd!',
      'password-confirmation': 'something else'
    })).to.be.rejectedWith('Confirmarea parolei este incorectă');
  });

  it('accepts valid data', function() {
    expect(validator.validate({
      'email': 'test@test.com',
      'password': 'P4ssw0rd!',
      'password-confirmation': 'P4ssw0rd!'
    })).to.be.fulfilled;
  });
});

var RegistrationFormValidator = require('app/pages/registration/registration-form-validator');
