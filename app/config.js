'use strict';

var DAY = 24 * 3600 * 1000;

var config = {
  PAYMENT_PERIOD: 365 * DAY,
  PAYMENT_GRACE_PERIOD: 7 * DAY,

  CLIENT_LIST_PATH: '/clients',
  LAST_PAYMENT_TIMESTAMP_PATH: '/timestamps/lastPayment'
};

module.exports = config;
