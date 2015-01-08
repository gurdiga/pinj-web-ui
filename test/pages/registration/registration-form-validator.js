'use strict';

var RegistrationFormValidator = require('app/pages/registration/registration-form-validator');

describe('RegistrationFormValidator', function() {
  var validator;

  beforeEach(function() {
    validator = new RegistrationFormValidator();
  });

  describe('validate', function() {
    it('rejects empty email', function(done) {
      expect(validator.validate({
        'email': '',
        'password': 'P4ssw0rd!',
        'password-confirmation': 'P4ssw0rd!'
      })).to.be.rejectedWith('Adresa de email lipseşte')
      .and.notify(done);
    });

    it('rejects syntactically incorrect email', function(done) {
      expect(validator.validate({
        'email': 'garbage',
        'password': 'P4ssw0rd!',
        'password-confirmation': 'P4ssw0rd!'
      })).to.be.rejectedWith('Adresa de email este incorectă sintactic')
      .and.notify(done);
    });

    it('rejects empty password', function(done) {
      expect(validator.validate({
        'email': 'test@test.com',
        'password': '',
        'password-confirmation': ''
      })).to.be.rejectedWith('Parola lipseşte')
      .and.notify(done);
    });

    it('rejects incorrect password confirmation', function(done) {
      expect(validator.validate({
        'email': 'test@test.com',
        'password': 'P4ssw0rd!',
        'password-confirmation': 'something else'
      })).to.be.rejectedWith('Confirmarea parolei este incorectă')
      .and.notify(done);
    });

    it('accepts valid data', function(done) {
      expect(validator.validate({
        'email': 'test@test.com',
        'password': 'P4ssw0rd!',
        'password-confirmation': 'P4ssw0rd!'
      })).to.be.fulfilled
      .and.notify(done);
    });
  });
});
