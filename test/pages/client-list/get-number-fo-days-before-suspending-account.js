'use strict';

var ONE_DAY = 24 * 3600 * 1000;

describe('getNumberOfDaysBeforeSuspendingAccount', function() {
  var timestamps = {
    registration: 1111111111111,
    lastPayment: 1111111111111
  };

  describe('when in trial', function() {
    beforeEach(function() {
      timestamps.registration = Date.now() - config.TRIAL_PERIOD + 24 * 3600 * 1000;
    });

    it('returns the number of trial days remaining', function() {
      expect(getNumberOfDaysBeforeSuspendingAccount(timestamps)).to.equal(1);
    });
  });

  describe('if not trial', function() {
    beforeEach(function() {
      var outOfTrial = Date.now() - config.TRIAL_PERIOD - 24 * 3600 * 1000;
      timestamps.registration = outOfTrial;

      var lastDayOfPaymentPeriod = Date.now() - config.PAYMENT_PERIOD + 24 * 3600 * 1000;
      timestamps.lastPayment = lastDayOfPaymentPeriod;
    });

    it('returns days of grace remaining', function() {
      var graceDays = config.GRACE_PERIOD / ONE_DAY;
      expect(getNumberOfDaysBeforeSuspendingAccount(timestamps)).to.equal(graceDays + 1);
    });
  });
});

var getNumberOfDaysBeforeSuspendingAccount = require('app/pages/client-list/get-number-fo-days-before-suspending-account');
var config = require('app/config');
