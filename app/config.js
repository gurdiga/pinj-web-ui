'use strict';

var DAY = 24 * 3600 * 1000;
var WEEK = 7 * DAY;
var MONTH = 31 * DAY;

var config = {
  TRIAL_PERIOD: 3 * MONTH,
  PAYMENT_PERIOD: 12 * MONTH,
  GRACE_PERIOD: 1 * WEEK,

  CLIENT_LIST_PATH: '/clients',
  TIMESTAMPS_PATH: '/timestamps',
  REGISTRATION_TIMESTAMP_PATH: '/timestamps/registration',
  LAST_PAYMENT_TIMESTAMP_PATH: '/timestamps/lastPayment'
};

module.exports = config;
