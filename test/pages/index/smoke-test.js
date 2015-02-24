'use strict';

describe('Home page smoke test', function() {
  before(function() {
    return H.navigateTo(Navigation.getPathForPage('IndexPage'));
  });

  describe('when not authenticated', function() {
    var form;

    it('only shows the non-private navigation links', function() {
      var navigationLinks = arrayify(this.app.querySelectorAll('nav a'));
      var visibleLinkLabels = navigationLinks.filter(visible).map(get('innerText'));

      expect(visibleLinkLabels).to.deep.equal(['Home', 'Înregistrare']);
    });

    describe('authentication form validation', function() {
      var submitButton;

      before(function() {
        form = DOM.require('#authentication-form', this.app);
        submitButton = DOM.require('button[type="submit"]', form);
      });

      describe('when form is submitted without entering the email', function() {
        before(function() {
          form['email'].value = '';
          submitButton.click();
          return when(form, 'work-finished');
        });

        it('shows the appropriate error', function() {
          var error = $('.validation-error', form);
          expect(error).to.be.visible;
          expect(error).to.have.text('Adresa de email lipseşte.');
        });
      });

      describe('when email is syntactically incorrect', function() {
        before(function() {
          form['email'].value = 'invalid-42';
          submitButton.click();
          return when(form, 'work-finished');
        });

        it('shows the appropriate error', function() {
          var error = $('.validation-error', form);
          expect(error).to.be.visible;
          expect(error).to.have.text('Adresa de email este incorectă sintactic.');
        });
      });

      describe('when password is missing', function() {
        before(function() {
          form['email'].value = 'valid@email.com';
          form['password'].value = '';
          submitButton.click();
          return when(form, 'work-finished');
        });

        it('shows the appropriate error', function() {
          var error = $('.validation-error', form);
          expect(error).to.be.visible;
          expect(error).to.have.text('Parola lipseşte.');
        });
      });

      describe('when UserData responds with an error', function() {
        before(function() {
          form['email'].value = 'unregistered-email@address.com';
          form['password'].value = 'a randomly incorrect password';
          submitButton.click();
          return when(form, 'work-finished');
        });

        it('shows it', function() {
          var error = $('.validation-error', form);
          expect(error).to.be.visible;
          expect(error).to.have.text('Această adresă de email nu este înregistrată.');
        });
      });
    });

    describe('password recovery link', function() {
      var passwordRecoveryLink, enteredEmailAddress;

      before(function() {
        form['email'].value = 'email@test.com';
        enteredEmailAddress = form['email'].value;

        passwordRecoveryLink = DOM.require('a#password-recovery', form);
        passwordRecoveryLink.click();

        return H.waitForReload();
      });

      it('forwards the entered email to password recovery page', function() {
        var emailField = $('#password-recovery-form [name="email"]', this.app);
        expect(emailField).to.exist;
        expect(emailField).to.have.value(enteredEmailAddress);
      });

      after(function() {
        return H.navigateTo(Navigation.getPathForPage('IndexPage'));
      });
    });

    function visible(domElement) {
      return $(domElement).is(':visible');
    }

    function get(propertyName) {
      return function(object) {
        return object[propertyName];
      };
    }
  });

  describe('when authenticated', function() {
    it('does stuff');
  });
});

var Navigation = require('app/widgets/navigation');
var DOM = require('app/services/dom');
var arrayify = require('app/util/arrayify');
var when = require('app/util/when');
