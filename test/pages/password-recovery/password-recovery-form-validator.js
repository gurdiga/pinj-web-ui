'use strict';

describe('PasswordRecoveryFormValidator', function() {
  var validator;

  beforeEach(function() {
    validator = new PasswordRecoveryFormValidator();
  });

  describe('validate', function() {
    it('rejects empty email', function() {
      expect(validator.validate({
        'email': ''
      })).to.be.rejectedWith('Adresa de email lipseşte');
    });

    it('rejects syntactically incorrect email', function() {
      expect(validator.validate({
        'email': 'garbage'
      })).to.be.rejectedWith('Adresa de email este incorectă sintactic');
    });

    it('accepts valid data', function() {
      expect(validator.validate({
        'email': 'test@test.com'
      })).to.be.fulfilled;
    });
  });
});

var PasswordRecoveryFormValidator = require('app/pages/password-recovery/password-recovery-form-validator');
