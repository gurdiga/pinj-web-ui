'use strict';

module.exports = ClientList;

function ClientList(userData) {
  this.load = function() {
    return userData.get('clients');
  };

  this.save = function(list) {
    return userData.set('clients', list);
  };
}
