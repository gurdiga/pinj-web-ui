'use strict';

var AuthenticationFormValidator = require('app/pages/index/authentication-form-validator');

describe('AuthenticationFormValidator', function() {
  var validator;

  beforeEach(function() {
    validator = new AuthenticationFormValidator();
  });

  describe('validate', function() {
    this.timeout(100);

    it('rejects empty email', function(done) {
      expect(validator.validate({
        'email': '',
        'password': 'P4ssw0rd!'
      })).to.be.rejectedWith('Adresa de email lipseşte')
      .and.notify(done);
    });

    it('rejects syntactically incorrect email', function(done) {
      expect(validator.validate({
        'email': 'garbage',
        'password': 'P4ssw0rd!'
      })).to.be.rejectedWith('Adresa de email este incorectă sintactic')
      .and.notify(done);
    });

    it('rejects empty password', function(done) {
      expect(validator.validate({
        'email': 'test@test.com',
        'password': ''
      })).to.be.rejectedWith('Parola lipseşte')
      .and.notify(done);
    });

    it('accepts valid data', function(done) {
      expect(validator.validate({
        'email': 'test@test.com',
        'password': 'P4ssw0rd!'
      })).to.be.fulfilled
      .and.notify(done);
    });
  });
});
