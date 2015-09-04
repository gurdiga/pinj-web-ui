'use strict';

var DAY = 24 * 3600 * 1000;

describe('isInGracePeriod', function() {
  it('returns true when payed and subscription ended one day ago', function() {
    var lastPaymentTimestamp = Date.now() - config.PAYMENT_PERIOD - 1 * DAY;
    expect(isInGracePeriod(lastPaymentTimestamp)).to.equal(true);
  });

  it('returns false when payed and subscription ended and grace period ended one day ago', function() {
    var lastPaymentTimestamp = Date.now() - config.PAYMENT_PERIOD - config.GRACE_PERIOD - 1 * DAY;
    expect(isInGracePeriod(lastPaymentTimestamp)).to.equal(false);
  });
});

var isInGracePeriod = require('app/pages/client-list/is-in-grace-period');
var config = require('app/config');
