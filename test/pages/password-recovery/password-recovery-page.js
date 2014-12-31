'use strict';

var PasswordRecoveryPage = require('app/pages/password-recovery/password-recovery-page');
var UserData = require('app/services/user-data');
var Promise = require('app/services/promise');

describe('PasswordRecoveryPage', function() {
  var passwordRecoveryPage, userData, email, queryString;

  before(function(done) {
    email = 'test@test.com';
    queryString = '?email=' + encodeURIComponent(email);

    H.navigateTo(PasswordRecoveryPage.PATH + queryString)
    .then(done, done);
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
    beforeEach(function(done) {
      this.sinon.stub(userData, 'sendPasswordRecoveryEmail').returns(Promise.resolve());
      passwordRecoveryPage.submitForm({
        'email': email
      })
      .then(done, done);
    });

    it('replaces the form with a success message', function() {
      expect(passwordRecoveryPage.isFormIrrelevantMessageDisplayed()).to.be.true;
      expect(passwordRecoveryPage.isFormHidden()).to.be.true;
    });
  });
});
