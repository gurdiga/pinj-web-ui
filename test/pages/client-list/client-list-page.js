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
      var paymentOverdueNoteDOMElement = DOM.require('#account-suspended', domElement);
      expect(paymentOverdueNoteDOMElement.style.display).to.equal('none');
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

    describe('when payment overdue and the grace period passed', function() {
      beforeEach(function(done) {
        makePaymentOverdueAndOverGracePeriod();
        clientListPage = new ClientListPage(domElement, userData);
        Promise.nextTick().then(done);
      });

      it('displays the account suspended alert', function() {
        var paymentOverdueNoteDOMElement = DOM.require('#account-suspended', domElement);
        expect(paymentOverdueNoteDOMElement.style.display).to.equal('block');
      });

      function makePaymentOverdueAndOverGracePeriod() {
        var oneDay = 24 * 3600 * 1000;
        var overduePaymentTimestamp = Date.now() - (config.PAYMENT_PERIOD + config.PAYMENT_GRACE_PERIOD + oneDay);

        userData.get.withArgs(config.LAST_PAYMENT_TIMESTAMP_PATH)
        .returns(Promise.resolve(overduePaymentTimestamp));
      }
    });

    describe('when payment overdue but the grace period', function() {
      // TODO
    });

    describe('when in trial period', function() {
      // TODO
    });

    describe('when payment is OK', function() {
      // TODO
    });
  });
});

var ClientListPage = require('app/pages/client-list/client-list-page');
var Navigation = require('app/widgets/navigation');
var UserData = require('app/services/user-data');
var Promise = require('app/services/promise');
var DOM = require('app/services/dom');
var config = require('app/config');
