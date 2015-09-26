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
    });

    function setTimestamps(timestamps) {
      userData.get.withArgs(config.TIMESTAMPS_PATH).returns(Promise.resolve(timestamps));
    }

    function initPage() {
      new ClientListPage(domElement, userData);
      return Promise.nextTick();
    }
  });
});

var ClientListPage = require('app/pages/client-list/client-list-page');
var Navigation = require('app/widgets/navigation');
var UserData = require('app/services/user-data');
var Promise = require('app/services/promise');
var DOM = require('app/services/dom');
var config = require('app/config');
