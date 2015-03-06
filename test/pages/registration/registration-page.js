'use strict';

var RegistrationPage = require('app/pages/registration/registration-page');
var Navigation = require('app/widgets/navigation');
var UserData = require('app/services/user-data');
var config = require('app/config');
var Promise = require('app/services/promise');

describe('RegistrationPage', function() {
  var registrationPage, userData;

  before(function(done) {
    H.navigateTo(Navigation.getPathForPage('RegistrationPage'))
    .then(done, done);
  });

  beforeEach(function() {
    userData = new UserData(config.FIREBASE_URL);
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
      expect(this.iframe.location.pathname).to.equal(Navigation.getPathForPage('ClientListPage'));
    });
  });
});
