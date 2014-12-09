'use strict';

var UserData = require('app/services/user-data');

describe.integration('UserData', function() {
  this.timeout(10000);

  var email = 'user-data@test.com';
  var password = 'P4ssw0rd!';
  var userData;

  beforeEach(function() {
    userData = new UserData();
  });

  it('can register a user', function(done) {
    userData.registerUser(email, password)
    .then(done, done);
  });

  it('can authenticate the registered user', function(done) {
    userData.authenticateUser(email, password)
    .then(function() {
      expect(userData.isCurrentlyAuthenticated()).to.be.true;
      expect(userData.getCurrentUserEmail()).to.equal(email);
      expect(userData.getCurrentUserId()).to.exist;
      done();
    })
    .catch(done);
  });

  it('can get some saved piece of data', function(done) {
    var path = 'some/path';
    var value = 'yes';

    console.log('now');
    userData.set(path, value)
    .then(function() {
      console.log('OK set');
    })
    .then(function() {
      return userData.get(path);
    })
    .then(function(returnedValue) {
      expect(returnedValue).to.equal(value);
      done();
    })
    .catch(done);
  });

  it('can unregister the registered user', function(done) {
    userData.unregisterUser(email, password)
    .then(done, done);
  });

  it('can unauthenticate the registered user', function(done) {
    userData.unauthenticateCurrentUser()
    .then(function() {
      expect(userData.isCurrentlyAuthenticated()).to.be.false;
      expect(userData.getCurrentUserEmail()).to.equal('NOT_AUTHENTICATED');
      expect(userData.getCurrentUserId()).to.equal('NOT_AUTHENTICATED');
      done();
    })
    .catch(done);
  });

  after(function(done) {
    userData.unregisterUser(email, password)
    .then(function() {
      expect(it, 'User should have been unregistered').not.to.be.false;
    })
    .catch(function(error) {
      expect(error.message).to.equal('Această adresă de email nu este înregistrată.');
    })
    .finally(done);
  });
});
