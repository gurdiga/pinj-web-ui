'use strict';

describe('PasswordRecoveryPage', function() {
  var passwordRecoveryPage, userData, email, queryString;

  before(function() {
    email = 'test@test.com';
    queryString = '?email=' + encodeURIComponent(email);

    return H.navigateTo(Navigation.getPathForPage('PasswordRecoveryPage') + queryString);
  });

  beforeEach(function() {
    userData = new UserData();
    passwordRecoveryPage = new PasswordRecoveryPage(this.app, userData);
  });

  it('can see the email passed on query string', function() {
    var passedEmail = passwordRecoveryPage.getEmailFromQueryString(this.iframe.location);
    expect(passedEmail).to.equal(email);
  });

  describe('form submission', function() {
    beforeEach(function() {
      this.sinon.stub(userData, 'sendPasswordRecoveryEmail').returns(Promise.resolve());

      return passwordRecoveryPage.submitForm({
        'email': email
      });
    });

    it('replaces the form with a success message', function() {
      expect(passwordRecoveryPage.isFormIrrelevantMessageDisplayed()).to.be.true;
      expect(passwordRecoveryPage.isFormHidden()).to.be.true;
    });
  });
});

var PasswordRecoveryPage = require('app/pages/password-recovery/password-recovery-page');
var Navigation = require('app/widgets/navigation');
var UserData = require('app/services/user-data');
var Promise = require('app/services/promise');
