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

}());
