'use strict';

function UserData() {
  /*global Firebase*/
  var firebaseRef = new Firebase('https://pinj-dev.firebaseio.com');

  this.registerUser = function(email, password) {
    return new Promise(function(resolve, reject) {
      firebaseRef.createUser({
        email: email,
        password: password
      }, forwardTo(resolve, reject));
    });
  };

  this.authenticateUser = function(email, password) {
    return new Promise(function(resolve, reject) {
      firebaseRef.authWithPassword({
        email: email,
        password: password
      }, function(error, session) {
        if (!error) {
          this.set('uid', session.uid)
          .then(resolve, reject);
        } else {
          reject(getLocalizedError(error.code));
        }
      }.bind(this));
    }.bind(this));
  };

  this.isCurrentlyAuthenticated = function() {
    var session = firebaseRef.getAuth();
    if (!session) return false;
    return session.expires >= Date.now() / 1000;
  };

  this.getCurrentUserEmail = function() {
    var session = firebaseRef.getAuth();
    if (!session) return 'NOT_AUTHENTICATED';
    return session.password.email || 'NO_EMAIL_ON_SESSION';
  };

  this.getCurrentUserId = function() {
    var session = firebaseRef.getAuth();
    if (!session) return 'NOT_AUTHENTICATED';
    return session.uid || 'NO_UID_ON_SESSION';
  };

  this.sendPasswordRecoveryEmail = function(email) {
    return new Promise(function(resolve, reject) {
      firebaseRef.resetPassword({email: email}, forwardTo(resolve, reject));
    });
  };

  this.changePassword = function(oldPassword, newPassword) {
    return new Promise(function(resolve, reject) {
      firebaseRef.changePassword({
        email: this.getCurrentUserEmail(),
        oldPassword: oldPassword,
        newPassword: newPassword
      }, forwardTo(resolve, reject));
    }.bind(this));
  };

  this.unauthenticateCurrentUser = function() {
    return new Promise(function(resolve) {
      firebaseRef.unauth();
      resolve();
    });
  };

  this.unregisterUser = function(email, password) {
    return new Promise(function(resolve, reject) {
      firebaseRef.removeUser({
        email: email,
        password: password
      }, function(error) {
        if (!error) {
          this.set('', null)
          .then(resolve, reject);
        } else {
          reject(getLocalizedError(error.code));
        }
      }.bind(this));
    }.bind(this));
  };

  this.set = function(path, value) {
    return new Promise(function(resolve, reject) {
      firebaseRef.child('/data/' + aid(this) + '/' + path)
      .set(value, forwardTo(resolve, reject));
    }.bind(this));
  };

  this.get = function(path) {
    return new Promise(function(resolve, reject) {
      firebaseRef.child('/data/' + aid(this) + '/' + path)
      .once('value',
        function successCallback(snapshot) { resolve(snapshot.val()); },
        function failureCallback(error) { reject(getLocalizedError(error.code)); }
      );
    }.bind(this));
  };

  function aid(instance) {
    return instance.getCurrentUserEmail().replace(/\./g, ':');
  }
}

function forwardTo(resolve, reject) {
  return function(error) {
    if (error) reject(getLocalizedError(error.code));
    else resolve();
  };
}

function getLocalizedError(code) {
  var MESSAGES_BY_CODE = {
    EMAIL_TAKEN: 'Această adresă de email este înregistrată deja.',
    INVALID_EMAIL: 'Adresa de email este incorectă sintactic.',
    INVALID_USER: 'Această adresă de email nu este înregistrată.',
    INVALID_PASSWORD: 'Parola este incorectă.',
    NETWORK_ERROR: 'Conexiunea la Internet este instabilă sau lipseşte.',
    PERMISSION_DENIED: 'Acces interzis.'
  };

  var FALLBACK_MESSAGE = 'A intervenit o eroare neprevăzută (' + code + ').';

  var localizedMessage = MESSAGES_BY_CODE[code] || FALLBACK_MESSAGE;
  var error = new Error(localizedMessage);
  error.code = code;
  return error;
}

var Promise = require('app/services/promise');

module.exports = UserData;
