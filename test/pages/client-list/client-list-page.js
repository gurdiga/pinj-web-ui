'use strict';

describe('ClientListPage', function() {
  var clientListPage, userData;

  before(function() {
    return H.navigateTo(Navigation.getPathForPage('ClientListPage'));
  });

  beforeEach(function() {
    userData = new UserData();
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

var ClientListPage = require('app/pages/client-list/client-list-page');
var Navigation = require('app/widgets/navigation');
var UserData = require('app/services/user-data');
