'use strict';

describe('IndexPage', function() {
  var indexPage, userData;

  before(function() {
    return H.navigateTo(Navigation.getPathForPage('IndexPage'));
  });

  beforeEach(function() {
    userData = new UserData();
    this.sinon.stub(userData, 'set').returns(Promise.resolve());
  });

  describe('when user is already authenticated', function() {
    beforeEach(function() {
      this.sinon.stub(userData, 'isCurrentlyAuthenticated').returns(true);
      indexPage = new IndexPage(this.app, userData);
    });

    it('replaces the form with an informative message', function() {
      expect(indexPage.isFormHidden()).to.be.true;
      expect(indexPage.isFormIrrelevantMessageDisplayed()).to.be.true;
    });
  });

  describe('when user is not yet authenticated', function() {
    beforeEach(function() {
      this.sinon.stub(userData, 'authenticateUser').returns(Promise.resolve());
      this.sinon.stub(userData, 'isCurrentlyAuthenticated').returns(false);
      indexPage = new IndexPage(this.app, userData);
    });

    describe('after authentication', function() {
      beforeEach(function() {
        return indexPage.submitForm({
          'email'   : 'test@test.com',
          'password': 'P4ssw0rd!'
        })
        .then(H.waitForReload);
      });

      it('redirects to the client list page', function() {
        expect(this.iframe.location.pathname).to.equal(Navigation.getPathForPage('ClientListPage'));
      });
    });
  });
});

var IndexPage = require('app/pages/index/index-page');
var Navigation = require('app/widgets/navigation');
var UserData = require('app/services/user-data');
var Promise = require('app/services/promise');
