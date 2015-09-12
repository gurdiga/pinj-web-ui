'use strict';

function ClientList(userData) {
  this.load = function() {
    return userData.get(config.CLIENT_LIST_PATH);
  };

  this.save = function(list) {
    return userData.set(config.CLIENT_LIST_PATH, list)
      .then(function() {
        return userData.set(config.LAST_CLIENT_LIST_CHANGE_TIMESTAMP_PATH, Date.now());
      });
  };
}

var config = require('app/config');

module.exports = ClientList;
