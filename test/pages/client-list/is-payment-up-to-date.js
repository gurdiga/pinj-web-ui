'use strict';

var DAY = 24 * 3600 * 1000;

describe('isPaymentUpToDate', function() {
  it('returns false when there was no payment ever', function() {
    var lastPaymentTimestamps = null;
    expect(isPaymentUpToDate(lastPaymentTimestamps)).to.equal(false);
  });

  it('return true when there was a payment less than a payment period ago', function() {
    var oneDayBeforeSubscriptionEnd = Date.now() - config.PAYMENT_PERIOD + 1 * DAY;
    expect(isPaymentUpToDate(oneDayBeforeSubscriptionEnd)).to.equal(true);
  });
});

var isPaymentUpToDate = require('app/pages/client-list/is-payment-up-to-date');
var config = require('app/config');
