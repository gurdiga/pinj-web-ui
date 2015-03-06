'use strict';

describe('ClientList class', function() {
  var userData, clientList, text;

  beforeEach(function() {
    text = 'Client1\nClient2\nClient3';
    userData = new UserData(config.FIREBASE_URL);
    this.sinon.stub(userData, 'get').returns(Promise.resolve(text));
    this.sinon.stub(userData, 'set').returns(Promise.resolve());
    clientList = new ClientList(userData);
  });

  describe('save', function() {
    it('saves the given string under /clients path', function() {
      return clientList.save(text)
      .then(function() {
        expect(userData.set).to.have.been.calledWith('clients', text);
      });
    });
  });

  describe('load', function() {
    it('returns the contents under the /clients path', function() {
      return clientList.load()
      .then(function() {
        expect(userData.get).to.have.been.calledWith('clients');
      });
    });
  });
});

var ClientList = require('app/pages/client-list/client-list');
var UserData = require('app/services/user-data');
var config = require('app/config');
var Promise = require('app/services/promise');
