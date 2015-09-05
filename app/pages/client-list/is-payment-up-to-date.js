'use strict';

function isPaymentUpToDate(lastPaymentTimestamps) {
  if (!lastPaymentTimestamps) return false;

  var timeSinceLastPayment = Date.now() - lastPaymentTimestamps;
  return timeSinceLastPayment <= config.PAYMENT_PERIOD;
}

var config = require('app/config');

module.exports = isPaymentUpToDate;
