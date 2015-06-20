'use strict';

describe('LogoutLink', function() {
  var link, userData;
  var navigationTrap;

  beforeEach(function() {
    link = createLink();
    trapNavigationFor(link);

    userData = new UserData();
    this.sinon.stub(userData, 'unauthenticateCurrentUser');

    new LogoutLink(link, userData);
  });

  describe('when deauthenticated successfully', function() {
    beforeEach(function(done) {
      userData.unauthenticateCurrentUser.returns(Promise.resolve());
      link.click();
      expect(userData.unauthenticateCurrentUser, 'tries to deauthenticate').to.have.been.called;

      this.helpers.waitForReload(navigationTrap)
      .then(done, done);
    });

    it('navigates the link', function() {
      expect(navigationTrap.contentWindow.location.href).to.equal(link.href);
    });
  });

  describe('when deauthentication fails', function() {
    var deauthenticationError;

    beforeEach(function(done) {
      deauthenticationError = new Error('Something bad happened');
      userData.unauthenticateCurrentUser.returns(Promise.reject(deauthenticationError));
      this.sinon.stub(console, 'error');

      link.click();
      expect(userData.unauthenticateCurrentUser, 'tries to deauthenticate').to.have.been.called;
      Promise.nextTick().then(done);
    });

    it('logs the error', function() {
      expect(console.error).to.have.been.calledWith(deauthenticationError);
    });

    it('doesn’t navigate the link', function() {
      expect(navigationTrap.contentWindow.location.href).to.equal('about:blank');
    });
  });

  afterEach(removeTrap);

  function createLink() {
    var link = document.createElement('a');
    link.href = '/index.html';
    return link;
  }

  function trapNavigationFor(link) {
    navigationTrap = document.createElement('iframe');
    navigationTrap.name = 'navigation-trap';
    document.body.appendChild(navigationTrap);
    link.target = navigationTrap.name;
  }

  function removeTrap() {
    document.body.removeChild(navigationTrap);
  }
});

var LogoutLink = require('app/widgets/logout-link');
var UserData = require('app/services/user-data');
var Promise = require('app/services/promise');
