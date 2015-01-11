'use strict';

var Navigation = require('app/widgets/navigation');
var UserData = require('app/services/user-data');
var DOM = require('app/services/dom');

describe('Navigation', function() {
  describe('adjusts link visibility appropriatelly', function() {
    var domElement, userData;
    var privateLinks;

    beforeEach(function(done) {
      getProductionDOMElement(this)
      .then(function(productionDOMElement) { domElement = productionDOMElement; })
      .then(done, done);
    });

    beforeEach(function() {
      userData = new UserData();
      this.sinon.stub(userData, 'isCurrentlyAuthenticated');

      letFirstLinkBePrivate(domElement);
      privateLinks = getPrivateLinks(domElement);
      expect(privateLinks).to.have.length(1);
      expect(areAllHidden(privateLinks), 'private links are hidden initially').to.be.true;
    });

    describe('when NOT authenticated', function() {
      beforeEach(function() {
        userData.isCurrentlyAuthenticated.returns(false);
        new Navigation(domElement, userData);
      });

      it('private links are left hidden', function() {
        expect(areAllHidden(privateLinks)).to.be.true;
      });
    });

    describe('when authenticated', function() {
      beforeEach(function() {
        userData.isCurrentlyAuthenticated.returns(true);
        new Navigation(domElement, userData);
      });

      it('displays private links', function() {
        expect(areAllVisible(privateLinks)).to.be.true;
      });
    });

    function getAllLinks(domElement) {
      return [].slice.call(domElement.querySelectorAll('a'));
    }

    function getPrivateLinks(domElement) {
      return getAllLinks(domElement).filter(function(link) {
        return link.classList.contains('private');
      });
    }

    function areAllVisible(links) {
      return links.every(DOM.isVisible);
    }

    function areAllHidden(links) {
      return links.every(isNotVisible);

      function isNotVisible(element) {
        return !DOM.isVisible(element);
      }
    }

    function letFirstLinkBePrivate(domElement) {
      getAllLinks(domElement)[0].className = 'private';
    }
  });

  describe('getPathForPage', function() {
    it('returns the path for any registered page', function() {
      expect(Navigation.getPathForPage('IndexPage')).to.equal('/index.html');
    });

    it('throws for an unknown page', function() {
      expect(function() {
        Navigation.getPathForPage('MagicPage');
      }).to.throw(/Unknown page class “MagicPage”/);
    });
  });

  describe('getTitleForPage', function() {
    it('returns the link text for a given page', function() {
      expect(Navigation.getTitleForPage('IndexPage')).to.equal('Home');
    });

    it('throws for an unknown page', function() {
      expect(function() {
        Navigation.getTitleForPage('MagicPage');
      }).to.throw(/Unknown page class “MagicPage”/);
    });
  });

  function getProductionDOMElement(context) {
    return H.navigateTo(Navigation.getPathForPage('IndexPage'))
    .then(function() {
      return DOM.require('nav', context.app);
    });
  }
});
