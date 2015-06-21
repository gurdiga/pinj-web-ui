'use strict';

var PasswordChangePage = require('app/pages/password-change/password-change-page');
var Navigation = require('app/widgets/navigation');
var UserData = require('app/services/user-data');

describe.skip('PasswordChangePage', function() {
  var passwordChangePage, userData;

  before(function() {
    return H.navigateTo(Navigation.getPathForPage('PasswordChangePage'));
  });

  beforeEach(function() {
    userData = new UserData();
    this.sinon.stub(userData, 'isCurrentlyAuthenticated');
  });

  describe('when user is not authenticated', function() {
    beforeEach(function() {
      userData.isCurrentlyAuthenticated.returns(false);
      passwordChangePage = new PasswordChangePage(this.app, userData);
    });

    it('displays the “not authenticated” message instead of the form', function() {
      expect(passwordChangePage.isFormHidden()).to.be.true;
      expect(passwordChangePage.isFormIrrelevantMessageDisplayed()).to.be.true;
    });
  });
});
