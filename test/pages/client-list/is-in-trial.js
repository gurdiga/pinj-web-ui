'use strict';

var ONE_DAY = 24 * 3600 * 1000;

describe('isInTrial', function() {
  var timestamps = {
    registration: 1111111111111
  };

  describe('when not registered yet', function() {
    beforeEach(function() {
      timestamps.registration = undefined;
    });

    it('returns false', function() {
      expect(isInTrial(timestamps)).to.equal(false);
    });
  });

  describe('when registered less than a trial period ago', function() {
    beforeEach(function() {
      var halfTrialPeriodAgo = Date.now() - config.TRIAL_PERIOD / 2;
      timestamps.registration = halfTrialPeriodAgo;
    });

    it('returns true', function() {
      expect(isInTrial(timestamps)).to.equal(true);
    });
  });

  describe('when registered more than one trial period ago', function() {
    beforeEach(function() {
      timestamps.registration = Date.now() - config.TRIAL_PERIOD - 1 * ONE_DAY;
    });

    it('returns false', function() {
      expect(isInTrial(timestamps)).to.equal(false);
    });
  });
});

var isInTrial = require('app/pages/client-list/is-in-trial');
var config = require('app/config');
