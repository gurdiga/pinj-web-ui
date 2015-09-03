'use strict';

var ONE_DAY = 24 * 3600 * 1000;

describe('isPaymentUpToDate', function() {
  var timestamps = {
    lastPayment: 1111111111111
  };

  describe('when there was no payment ever', function() {
    beforeEach(function() {
      timestamps.lastPayment = undefined;
    });

    it('returns false', function() {
      expect(isPaymentUpToDate(timestamps)).to.equal(false);
    });
  });

  describe('when there was a payment less than a payment period ago', function() {
    beforeEach(function() {
      var oneDayBeforeSubscriptionEnd = Date.now() - config.PAYMENT_PERIOD + 1 * ONE_DAY;
      timestamps.lastPayment = oneDayBeforeSubscriptionEnd;
    });

    it('return true', function() {
      expect(isPaymentUpToDate(timestamps)).to.equal(true);
    });
  });
});

var isPaymentUpToDate = require('app/pages/client-list/is-payment-up-to-date');
var config = require('app/config');
