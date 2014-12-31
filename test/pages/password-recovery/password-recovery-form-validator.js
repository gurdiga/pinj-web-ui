'use strict';

var PasswordRecoveryFormValidator = require('app/pages/password-recovery/password-recovery-form-validator');

describe('PasswordRecoveryFormValidator', function() {
  var validator;

  beforeEach(function() {
    validator = new PasswordRecoveryFormValidator();
  });

  describe('validate', function() {
    this.timeout(100);

    it('rejects empty email', function(done) {
      expect(validator.validate({
        'email': ''
      })).to.be.rejectedWith('Adresa de email lipseşte')
      .and.notify(done);
    });

    it('rejects syntactically incorrect email', function(done) {
      expect(validator.validate({
        'email': 'garbage'
      })).to.be.rejectedWith('Adresa de email este incorectă sintactic')
      .and.notify(done);
    });

    it('accepts valid data', function(done) {
      expect(validator.validate({
        'email': 'test@test.com'
      })).to.be.fulfilled
      .and.notify(done);
    });
  });
});

