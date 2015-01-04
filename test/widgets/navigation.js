'use strict';

var Navigation = require('app/widgets/navigation');

describe('Navigation', function() {
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
});
