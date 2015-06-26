'use strict';

describe('AuthenticationFormValidator', function() {
  var validator;

  beforeEach(function() {
    validator = new AuthenticationFormValidator();
  });

  describe('validate', function() {
    it('rejects empty email', function() {
      expect(validator.validate({
        'email': '',
        'password': 'P4ssw0rd!'
      })).to.be.rejectedWith('Adresa de email lipseşte');
    });

    it('rejects syntactically incorrect email', function() {
      expect(validator.validate({
        'email': 'garbage',
        'password': 'P4ssw0rd!'
      })).to.be.rejectedWith('Adresa de email este incorectă sintactic');
    });

    it('rejects empty password', function() {
      expect(validator.validate({
        'email': 'test@test.com',
        'password': ''
      })).to.be.rejectedWith('Parola lipseşte');
    });

    it('accepts valid data', function() {
      expect(validator.validate({
        'email': 'test@test.com',
        'password': 'P4ssw0rd!'
      })).to.be.fulfilled;
    });
  });
});

var AuthenticationFormValidator = require('app/pages/index/authentication-form-validator');
