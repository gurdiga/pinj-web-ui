'use strict';

var Promise = require('app/services/promise');

function ClientList(userEmail) {
  this.userEmail = userEmail;

  this.load = function() {
    return new Promise(function() {
    });
  };

  this.save = function() {
    return new Promise(function() {
    });
  };
}

module.exports = ClientList;
