'use strict';

function ClientList(userData) {
  this.load = function() {
    return userData.get(config.CLIENT_LIST_PATH);
  };

  this.save = function(list) {
    return userData.set(config.CLIENT_LIST_PATH, list);
  };
}

var config = require('app/config');

module.exports = ClientList;
