(function() {
  'use strict';

  before(function() {
    this.helpers = {
      'navigateTo': factories.navigateTo(this),
      'submit': factories.submit(this),
      'waitForReload': factories.waitForReload(this)
    };
  });

  var factories = {
    'navigateTo': function(self) {
      return function(pathname) {
        expect(pathname, 'pathname to navigate to').to.exist;
        return navigateWithNoCache(self, pathname);
      };
    },

    'submit': function(self) {
      return function(form) {
        expect(form, 'form to submit').to.exist;
        var subimitButton = form.querySelector('button[type="submit"]');
        expect(subimitButton, 'submit button').to.exist;
        subimitButton.click();

        return self.helpers.waitForReload(self);
      };
    },

    'waitForReload': function(self) {
      return function() {
        var deferred = Q.defer();

        deferred.replaceWith = function(promise) {
          promise.then(this.resolve, this.reject);
        };

        once('load', self.iframeElement, function() {
          var redirectingPage = !!self.iframeElement.contentWindow.document.querySelector('meta[http-equiv="refresh"]');

          if (redirectingPage) deferred.replaceWith(self.helpers.waitForReload(self));
          else deferred.resolve(setTestContext(self));
        });

        return deferred.promise;
      };
    }
  };


  function navigateWithNoCache(self, pathname) {
    var TIME_FOR_THE_IFRAME_TO_CHANGE_LOCATION = 100;

    self.iframeElement.src = pathname;
    return Q.delay(TIME_FOR_THE_IFRAME_TO_CHANGE_LOCATION)
    .then(function() {
      self.iframeElement.contentWindow.location.reload(true);
      return self.helpers.waitForReload(self);
    });
  }

  function setTestContext(self) {
    self.iframe = self.iframeElement.contentWindow;
    self.app = self.iframe.document.body;
  }

  function once(eventName, element, f) {
    function callback() {
      var args = [].slice.call(arguments);
      element.removeEventListener(eventName, callback);
      f(args);
    }

    element.addEventListener(eventName, callback);
  }

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