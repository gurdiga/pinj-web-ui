'use strict';

describe('The smoke test', function() {
  var email = 'smoke-test' + Date.now() + '@test.com';
  var password = email;

  describe('Registration page', function() {
    before(function() {
      return H.navigateTo(Navigation.getPathForPage('RegistrationPage'));
    });

    describe('when not authenticated', function() {
      testPublicNavigation();

      before(function() {
        this.form = DOM.require('#registration-form', this.app);
        this.submitButton = DOM.require('button[type="submit"]', this.form);
      });

      describe('registration form validation', function() {
        testEmailValidation();
        testPasswordValidation();

        describe('when the password confrmation doesn’t match', function() {
          before(function() {
            this.form['password'].value = '53cr3t';
            this.form['password-confirmation'].value = '53cr3tkjbkerlwkl';
            this.submitButton.click();
            return when(this.form, 'finished-work');
          });

          it('shows the error', function() {
            var error = $('.validation-error', this.form);
            expect(error).to.be.visible;
            expect(error).to.have.text('Confirmarea parolei este incorectă.');
          });
        });

        describe('when UserData responds with an error', function() {
          before(function() {
            this.form['email'].value = 'test@test.com';
            this.form['password'].value = 'test@test.com';
            this.form['password-confirmation'].value = 'test@test.com';
            this.submitButton.click();
            return when(this.form, 'finished-work');
          });

          it('shows it', function() {
            var error = $('.validation-error', this.form);
            expect(error).to.be.visible;
            expect(error).to.have.text('Această adresă de email este înregistrată deja.');
          });
        });
      });

      describe('when the email and password are accepted', function() {
        before(function() {
          this.form['email'].value = email;
          this.form['password'].value = password;
          this.form['password-confirmation'].value = password;
          this.submitButton.click();
          return H.waitForReload();
        });

        testAuthenticatesTheUser();
        testDisplayedTheClientListPage();
        testLogoutLink();
      });
    });
  });

  describe('Home page', function() {
    before(function() {
      return H.navigateTo(Navigation.getPathForPage('IndexPage'));
    });

    describe('when not authenticated', function() {
      before(function() {
        this.form = DOM.require('#authentication-form', this.app);
        this.submitButton = DOM.require('button[type="submit"]', this.form);
      });

      testPublicNavigation();

      describe('authentication form validation', function() {
        testEmailValidation();
        testPasswordValidation();

        describe('when UserData responds with an error', function() {
          before(function() {
            this.form['email'].value = 'unregistered-email@address.com';
            this.form['password'].value = 'a randomly incorrect password';
            this.submitButton.click();
            return when(this.form, 'finished-work');
          });

          it('shows it', function() {
            var error = $('.validation-error', this.form);
            expect(error).to.be.visible;
            expect(error).to.have.text('Această adresă de email nu este înregistrată.');
          });
        });
      });

      describe('password recovery link', function() {
        var passwordRecoveryLink, enteredEmailAddress;

        before(function() {
          this.form = DOM.require('#authentication-form', this.app);
          this.form['email'].value = 'email@test.com';
          enteredEmailAddress = this.form['email'].value;

          passwordRecoveryLink = DOM.require('a#password-recovery', this.form);
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
    });

    describe('when the email and password are correct', function() {
      before(function() {
        this.form = DOM.require('#authentication-form', this.app);
        this.submitButton = DOM.require('button[type="submit"]', this.form);

        this.form['email'].value = email;
        this.form['password'].value = password;
        this.submitButton.click();
        return H.waitForReload();
      });

      testAuthenticatesTheUser();
      testDisplayedTheClientListPage();
      testPrivateNavigation();
      testLogoutLink();
    });
  });

  after(function() {
    var userData = new UserData();
    return userData.unregisterUser(email, password)
    .then(userData.unauthenticateCurrentUser);
  });

  function testEmailValidation() {
    describe('when form is submitted without entering the email', function() {
      before(function() {
        this.form['email'].value = '';
        this.submitButton.click();
        return when(this.form, 'finished-work');
      });

      it('shows the appropriate error', function() {
        var error = $('.validation-error', this.form);
        expect(error).to.be.visible;
        expect(error).to.have.text('Adresa de email lipseşte.');
      });
    });

    describe('when email is syntactically incorrect', function() {
      before(function() {
        this.form['email'].value = 'invalid-42';
        this.submitButton.click();
        return when(this.form, 'finished-work');
      });

      it('shows the appropriate error', function() {
        var error = $('.validation-error', this.form);
        expect(error).to.be.visible;
        expect(error).to.have.text('Adresa de email este incorectă sintactic.');
      });
    });
  }

  function testPasswordValidation() {
    describe('when password is missing', function() {
      before(function() {
        this.form['email'].value = 'valid@email.com';
        this.form['password'].value = '';
        this.submitButton.click();
        return when(this.form, 'finished-work');
      });

      it('shows the appropriate error', function() {
        var error = $('.validation-error', this.form);
        expect(error).to.be.visible;
        expect(error).to.have.text('Parola lipseşte.');
      });
    });
  }

  function testPublicNavigation() {
    it('only shows the non-private navigation links', function() {
      var navigationLinks = $('nav a:visible', this.app).get().map(get('innerText'));
      expect(navigationLinks).to.deep.equal(['Home', 'Înregistrare']);
    });
  }

  function testAuthenticatesTheUser() {
    it('authenticates the user', function() {
      var userData = new UserData();
      expect(userData.isCurrentlyAuthenticated()).to.be.true;
    });
  }

  function testDisplayedTheClientListPage() {
    it('redirects to their Client List page', function() {
      expect(this.iframe.location.pathname).to.equal('/client-list.html');
    });
  }

  function testPrivateNavigation() {
    it('it shows the private links', function() {
      var navigationLinks = $('nav a:visible', this.app).get().map(get('innerText'));
      expect(navigationLinks).to.deep.equal(['Home', 'Înregistrare', 'Lista de clienţi', 'Ieşire']);
    });
  }

  function testLogoutLink() {
    var logoutLink;

    it('displays the logout link', function() {
      logoutLink = $('#logout', this.app);
      expect(logoutLink).to.be.visible;
    });

    after(function() {
      logoutLink[0].click();
      return H.waitForReload();
    });
  }

  function get(propertyName) {
    return function(object) {
      return object[propertyName];
    };
  }
});

var Navigation = require('app/widgets/navigation');
var DOM = require('app/services/dom');
var when = require('app/util/when');
var UserData = require('app/services/user-data');
