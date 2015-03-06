'use strict';

var ClientListPage = require('app/pages/client-list/client-list-page');
var Navigation = require('app/widgets/navigation');
var UserData = require('app/services/user-data');
var config = require('app/config');

describe('ClientListPage', function() {
  var clientListPage, userData;

  before(function(done) {
    H.navigateTo(Navigation.getPathForPage('ClientListPage'))
    .then(done, done);
  });

  beforeEach(function() {
    userData = new UserData(config.FIREBASE_URL);
    this.sinon.stub(userData, 'isCurrentlyAuthenticated');
  });

  describe('when user is not authenticated', function() {
    beforeEach(function() {
      userData.isCurrentlyAuthenticated.returns(false);
      clientListPage = new ClientListPage(this.app, userData);
    });

    it('displays the “not authenticated” message instead of the form', function() {
      expect(clientListPage.isFormHidden()).to.be.true;
      expect(clientListPage.isFormIrrelevantMessageDisplayed()).to.be.true;
    });
  });

  describe('when user is authenticated', function() {
    beforeEach(function() {
      userData.isCurrentlyAuthenticated.returns(true);
      clientListPage = new ClientListPage(this.app, userData);
    });

    it('displays the form and hides “not authenticated” message', function() {
      expect(clientListPage.isFormHidden()).to.be.false;
      expect(clientListPage.isFormIrrelevantMessageDisplayed()).to.be.false;
    });
  });
});
