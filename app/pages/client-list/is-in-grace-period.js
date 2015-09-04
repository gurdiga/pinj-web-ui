'use strict';

function isInGracePeriod(lastPaymentTimestamp) {
  if (!lastPaymentTimestamp) return false;

  var timeSinceLastPayment = Date.now() - lastPaymentTimestamp;

  return timeSinceLastPayment > config.PAYMENT_PERIOD &&
         timeSinceLastPayment <= config.PAYMENT_PERIOD + config.GRACE_PERIOD;
}

var config = require('app/config');

module.exports = isInGracePeriod;
