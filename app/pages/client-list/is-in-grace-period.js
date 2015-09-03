'use strict';

function isInGracePeriod(timestamps) {
  var inTrial = Date.now() - timestamps.registration <= config.TRIAL_PERIOD;
  if (inTrial) return false;

  var noPayment = !timestamps.lastPayment;
  if (noPayment) return false;

  var timeSinceLastPayment = Date.now() - timestamps.lastPayment;
  return timeSinceLastPayment > config.PAYMENT_PERIOD &&
         timeSinceLastPayment <= config.PAYMENT_PERIOD + config.GRACE_PERIOD;
}

var config = require('app/config');

module.exports = isInGracePeriod;
