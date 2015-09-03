'use strict';

function isPaymentUpToDate(timestamps) {
  if (!timestamps.lastPayment) return false;

  var timeSinceLastPayment = Date.now() - timestamps.lastPayment;
  return timeSinceLastPayment <= config.PAYMENT_PERIOD;
}

var config = require('app/config');

module.exports = isPaymentUpToDate;
