'use strict';

var RegistrationPage = require('app/pages/registration/registration-page');
var ClientListPage = require('app/pages/client-list/client-list-page');
var UserData = require('app/services/user-data');
var Promise = require('app/services/promise');

describe('RegistrationPage', function() {
  var registrationPage, userData;

  before(function(done) {
    H.navigateTo(RegistrationPage.PATH).then(done, done);
  });

  beforeEach(function() {
		userData = new UserData();
    this.sinon.stub(userData, 'registerUser').returns(Promise.resolve());
    this.sinon.stub(userData, 'authenticateUser').returns(Promise.resolve());
    this.sinon.stub(userData, 'isCurrentlyAuthenticated').returns(false);
  });

  describe('when user is already authenticated', function() {
    beforeEach(function() {
      userData.isCurrentlyAuthenticated.returns(true);
      registrationPage = new RegistrationPage(this.app, userData);
    });

    it('replaces the form with an informative message', function() {
      expect(registrationPage.isFormHidden()).to.be.true;
      expect(registrationPage.isFormIrrelevantMessageDisplayed()).to.be.true;
    });
  });

  describe('form submission', function() {
    beforeEach(function() {
      registrationPage = new RegistrationPage(this.app, userData);
    });

    beforeEach(function(done) {
      registrationPage.submitForm({
        'email'                 : 'test@test.com',
        'password'              : 'P4ssw0rd!',
        'password-confirmation' : 'P4ssw0rd!'
      })
      .then(H.waitForReload)
      .then(done, done);
    });

    it('redirects to the client list page', function() {
      expect(this.iframe.location.pathname).to.equal(ClientListPage.PATH);
    });
  });
});
