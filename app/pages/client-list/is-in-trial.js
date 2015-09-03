'use strict';

function isInTrial(timestamps) {
  if (!timestamps.registration) return false;

  var timeSinceRegistration = Date.now() - timestamps.registration;
  return timeSinceRegistration <= config.TRIAL_PERIOD;
}

var config = require('app/config');

module.exports = isInTrial;
