'use strict';

describe('ClientList class', function() {
  var userData, clientList, text;

  beforeEach(function() {
    text = 'Client1\nClient2\nClient3';
    userData = new UserData();
    this.sinon.stub(userData, 'get').returns(Promise.resolve(text));
    this.sinon.stub(userData, 'set').returns(Promise.resolve());
    clientList = new ClientList(userData);
  });

  describe('save', function() {
    beforeEach(function() {
      this.sinon.stub(Date, 'now').returns(42);
    });

    it('saves the given string under /clients path, and the timestamp', function() {
      return clientList.save(text)
      .then(function() {
        expect(userData.set, 'saves the client list').to.have.been.calledWith(config.CLIENT_LIST_PATH, text);
        expect(userData.set, 'writes the timestamp').to.have.been
          .calledWith(config.LAST_CLIENT_LIST_CHANGE_TIMESTAMP_PATH, Date.now());
      });
    });
  });

  describe('load', function() {
    it('returns the contents under the /clients path', function() {
      return clientList.load()
      .then(function() {
        expect(userData.get).to.have.been.calledWith(config.CLIENT_LIST_PATH);
      });
    });
  });
});

var ClientList = require('app/pages/client-list/client-list');
var UserData = require('app/services/user-data');
var Promise = require('app/services/promise');
var config = require('app/config');
