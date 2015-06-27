'use strict';

describe('UserData', function() {
  this.timeout(10000);

  var email = 'user-data@test.com';
  var password = 'P4ssw0rd!';
  var userData;

  beforeEach(function() {
    userData = new UserData();
  });

  it('can register a user', function() {
    return userData.registerUser(email, password);
  });

  it('can authenticate the registered user', function() {
    return userData.authenticateUser(email, password)
    .then(function() {
      expect(userData.isCurrentlyAuthenticated()).to.be.true;
      expect(userData.getCurrentUserEmail()).to.equal(email);
      expect(userData.getCurrentUserId()).to.exist;
    });
  });

  it('can get some saved piece of data', function() {
    var path = 'some/path';
    var value = 'yes';

    return userData.set(path, value)
    .then(function() {
      return userData.get(path);
    })
    .then(function(returnedValue) {
      expect(returnedValue).to.equal(value);
    });
  });

  it('can change user’s password', function() {
    var oldPassword = password;
    var newPassword = 'new-P4ssw0rd';

    return userData.changePassword(oldPassword, newPassword)
    .then(function() {
      password = newPassword;
      return userData.authenticateUser(email, newPassword);
    });
  });

  it('can unregister the registered user', function() {
    return userData.unregisterUser(email, password);
  });

  it('can unauthenticate the registered user', function() {
    return userData.unauthenticateCurrentUser()
    .then(function() {
      expect(userData.isCurrentlyAuthenticated()).to.be.false;
      expect(userData.getCurrentUserEmail()).to.equal('NOT_AUTHENTICATED');
      expect(userData.getCurrentUserId()).to.equal('NOT_AUTHENTICATED');
    });
  });
});

var UserData = require('app/services/user-data');
