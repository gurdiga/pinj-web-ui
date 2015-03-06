'use strict';

describe('UserData', function() {
  var email = 'pinj-search-engine-user-data@test.com';
  var password = email;
  var userData;

  before(function() {
    userData = new UserData('https://pinj-dev.firebaseio.com');
    return userData.registerUser(email, password)
    .then(function() { return userData.authenticateUser(email, password); });
  });

  var registrationTimestamp;

  it('records timestamps on authentication', function() {
    return userData.get('timestamps')
    .then(function(timestamps) {
      expect(timestamps).to.have.property('registration');
      expect(timestamps).to.have.property('lastLogin');
      registrationTimestamp = timestamps.registration;
    });
  });

  after(function() {
    return userData.set('', null)
    .then(function() { return userData.unregisterUser(email, password); })
    .then(userData.unauthenticateCurrentUser);
  });
});

var UserData = require('app/services/user-data');
