'use strict';

describe('ClientListPage', function() {
  var clientListPage, userData, domElement;

  before(function() {
    return H.navigateTo(Navigation.getPathForPage('ClientListPage'));
  });

  beforeEach(function() {
    userData = new UserData();
    domElement = DOM.clone(this.app);

    this.sinon.stub(userData, 'isCurrentlyAuthenticated');
    this.sinon.stub(userData, 'get');
    userData.get.withArgs(config.CLIENT_LIST_PATH).returns(Promise.resolve('some lines of text'));
    userData.get.returns(Promise.resolve());
  });

  describe('when user is not authenticated', function() {
    beforeEach(function() {
      userData.isCurrentlyAuthenticated.returns(false);
      clientListPage = new ClientListPage(domElement, userData);
    });

    it('displays the “not authenticated” message instead of the form', function() {
      expect(clientListPage.isFormHidden()).to.be.true;
      expect(clientListPage.isFormIrrelevantMessageDisplayed()).to.be.true;
    });

    it('doesn’t display the payment overdue message', function() {
      expect(get('#account-suspended').style.display).to.equal('none');
    });
  });

  describe('when user is authenticated', function() {
    beforeEach(function() {
      userData.isCurrentlyAuthenticated.returns(true);
    });

    it('displays the form and hides “not authenticated” message', function() {
      clientListPage = new ClientListPage(domElement, userData);
      expect(clientListPage.isFormHidden()).to.be.false;
      expect(clientListPage.isFormIrrelevantMessageDisplayed()).to.be.false;
    });

    describe('when in trial period', function() {
      beforeEach(function(done) {
        setTimestamps({
          'registration': Date.now() - config.TRIAL_PERIOD / 2,
          'lastPayment': null
        });

        initPage().then(done);
      });

      assertNotDisplayed('#payment-overdue');
      assertNotDisplayed('#account-suspended');
    });

    describe('when payment ended and in grace period', function() {
      beforeEach(function(done) {
        setTimestamps({
          'registration': Date.now() - config.PAYMENT_PERIOD - config.TRIAL_PERIOD - oneDay,
          'lastPayment': Date.now() - config.PAYMENT_PERIOD - oneDay
        });

        initPage().then(done);
      });

      assertDisplayed('#payment-overdue');
      assertNotDisplayed('#account-suspended');
    });

    describe('when payment overdue and the grace period passed', function() {
      beforeEach(function(done) {
        setTimestamps({
          'registration': Date.now() - config.PAYMENT_PERIOD - config.TRIAL_PERIOD - oneDay,
          'lastPayment': Date.now() - config.PAYMENT_PERIOD - config.GRACE_PERIOD - oneDay
        });

        initPage().then(done);
      });

      assertNotDisplayed('#payment-overdue');
      assertDisplayed('#account-suspended');
    });

    describe('when payment is OK', function() {
      beforeEach(function(done) {
        setTimestamps({
          'registration': Date.now() - config.PAYMENT_PERIOD - config.TRIAL_PERIOD - oneDay,
          'lastPayment': Date.now() - config.PAYMENT_PERIOD / 2
        });

        initPage().then(done);
      });

      assertNotDisplayed('#payment-overdue');
      assertNotDisplayed('#account-suspended');
    });

    var oneDay = 24 * 3600 * 1000;

    function setTimestamps(timestamps) {
      userData.get.withArgs(config.TIMESTAMPS_PATH).returns(Promise.resolve(timestamps));
    }

    function initPage() {
      new ClientListPage(domElement, userData);
      return Promise.nextTick();
    }

    function assertNotDisplayed(selector) {
      it('doesn’t display ' + selector, function() {
        expect(get(selector).style.display).to.equal('none');
      });
    }

    function assertDisplayed(selector) {
      it('displays ' + selector, function() {
        expect(get(selector).style.display).to.equal('block');
      });
    }
  });

  function get(selector) {
    return DOM.require(selector, domElement);
  }
});

var ClientListPage = require('app/pages/client-list/client-list-page');
var Navigation = require('app/widgets/navigation');
var UserData = require('app/services/user-data');
var Promise = require('app/services/promise');
var DOM = require('app/services/dom');
var config = require('app/config');
