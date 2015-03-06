'use strict';

module.exports = MyUserData;

var inherits = require('inherits');
var UserData = require('util-data-browser');

inherits(MyUserData, UserData);

function MyUserData(url) {
  UserData.call(this, url);

  var _authenticateUser = this.authenticateUser.bind(this);
  this.authenticateUser = function(email, password) {
    return _authenticateUser(email, password)
    .then(recordRegistrationTimestamp)
    .then(recordLastLoginTimestamp);
  };

  var self = this;

  function recordRegistrationTimestamp() {
    return self.get('timestamps/registration')
    .then(function(registrationTimestamp) {
      if (!registrationTimestamp) {
        return self.set('timestamps/registration', Date.now());
      }
    });
  }

  function recordLastLoginTimestamp() {
    return self.set('timestamps/lastLogin', Date.now());
  }
}
