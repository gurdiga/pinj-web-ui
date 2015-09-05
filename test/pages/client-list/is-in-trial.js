'use strict';

var ONE_DAY = 24 * 3600 * 1000;

describe('isInTrial', function() {
  it('returns true when registered less than a trial period ago', function() {
    var halfTrialPeriodAgo = Date.now() - config.TRIAL_PERIOD / 2;
    expect(isInTrial(halfTrialPeriodAgo)).to.equal(true);
  });

  it('returns false when registered more than one trial period ago', function() {
    var registrationTimestamp = Date.now() - config.TRIAL_PERIOD - 1 * ONE_DAY;
    expect(isInTrial(registrationTimestamp)).to.equal(false);
  });
});

var isInTrial = require('app/pages/client-list/is-in-trial');
var config = require('app/config');
