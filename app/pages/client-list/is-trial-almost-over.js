'use strict';

function isTrialAlmostOver(registrationTimestamp) {
  var timeSinceRegistration = Date.now() - registrationTimestamp;

  return timeSinceRegistration <= config.TRIAL_PERIOD &&
         timeSinceRegistration >= config.TRIAL_PERIOD - config.TRIAL_ALMOST_OVER_PERIOD;
}

var config = require('app/config');

module.exports = isTrialAlmostOver;
