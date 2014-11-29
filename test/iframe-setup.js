(function() {
  'use strict';

  var IFRAME_ID = 'app';

  before(function(done) {
    injectIframe(this);

    this.helpers.navigateTo('/')
    .then(updateTheTitle(this))
    .then(done, done);
  });

  function injectIframe(self) {
    self.iframeElement = document.createElement('iframe');
    self.iframeElement.id = IFRAME_ID;
    self.iframeElement.src = 'about:blank';
    document.body.appendChild(self.iframeElement);
    styleIframe(IFRAME_ID);
  }

  function styleIframe(id) {
    var css = document.createElement('style');

    css.textContent = '' +
      'iframe#' + id + ' {' +
      '  position: fixed;' +
      '  top: 60px;' +
      '  right: 85px;' +
      '  width: 400px;' +
      '  height: 85%;' +
      '  border: 5px solid #eee;' +
      '  background: white;' +
      '  opacity: .3;' +
      '  transition: opacity 0.5s ease;' +
      '}' +
      'iframe#' + id + ':hover {' +
      '  opacity: 1;' +
      '}';

    document.body.appendChild(css);
  }

  function updateTheTitle(self) {
    return function() {
      if (document.title.substr(-1) === ':') {
        document.title += ' ' + self.iframe.document.title;
      }
    };
  }

}());
