'use strict';

var DAY = 24 * 3600 * 1000;

describe('isTrialAlmostOver', function() {
  it('returns false when when still in trial', function() {
    var registrationTimestamp = Date.now() - 5 * DAY;
    expect(isTrialAlmostOver(registrationTimestamp)).to.equal(false);
  });

  it('returns true when when less than a week is left', function() {
    var registrationTimestamp = Date.now() - config.TRIAL_PERIOD + 5 * DAY;
    expect(isTrialAlmostOver(registrationTimestamp)).to.equal(true);
  });

  it('returns false when when trial ended one day ago', function() {
    var registrationTimestamp = Date.now() - config.TRIAL_PERIOD - 1 * DAY ;
    expect(isTrialAlmostOver(registrationTimestamp)).to.equal(false);
  });
});

var isTrialAlmostOver = require('app/pages/client-list/is-trial-almost-over');
var config = require('app/config');
