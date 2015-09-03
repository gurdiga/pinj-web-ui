'use strict';

var ONE_DAY = 24 * 3600 * 1000;

describe('isInGracePeriod', function() {
  var timestamps = {
    registration: 1111111111111,
    lastPayment: 1111111111111
  };

  describe('when in trial perion', function() {
    beforeEach(function() {
      var tenMoreDaysOfTrial = Date.now() - config.TRIAL_PERIOD + 10 * ONE_DAY;
      timestamps.registration = tenMoreDaysOfTrial;
      timestamps.lastPayment = undefined;
    });

    it('returns false', function() {
      expect(isInGracePeriod(timestamps)).to.equal(false);
    });
  });

  describe('when out of trial but no payment yet', function() {
    beforeEach(function() {
      var tenDaysAfterTrial = Date.now() - config.TRIAL_PERIOD - 10 * ONE_DAY;
      timestamps.registration = tenDaysAfterTrial;
      timestamps.lastPayment = undefined;
    });

    it('returns false', function() {
      expect(isInGracePeriod(timestamps)).to.equal(false);
    });
  });

  describe('when payed and subscription ended one day ago', function() {
    beforeEach(function() {
      var oneDayAfterSubscriptionEnded = Date.now() - config.TRIAL_PERIOD - config.PAYMENT_PERIOD - 1 * ONE_DAY;
      timestamps.registration = oneDayAfterSubscriptionEnded;
      timestamps.lastPayment = Date.now() - config.PAYMENT_PERIOD - 1 * ONE_DAY;
    });

    it('returns true', function() {
      expect(isInGracePeriod(timestamps)).to.equal(true);
    });
  });
});

var isInGracePeriod = require('app/pages/client-list/is-in-grace-period');
var config = require('app/config');
