'use strict';

function isInTrial(registrationTimestamp) {
  var timeSinceRegistration = Date.now() - registrationTimestamp;
  return timeSinceRegistration <= config.TRIAL_PERIOD;
}

var config = require('app/config');

module.exports = isInTrial;
