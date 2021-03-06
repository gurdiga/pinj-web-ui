'use strict';

describe('AuthenticationForm', function() {
  var authenticationForm, domElement, formValidationError, submitButtonSpinner, userData;
  var productionDOMElement, email, password, submitTrap;

  before(function(done) {
    getProductionDOMElement(this)
    .then(function(domElement) { productionDOMElement = domElement; })
    .then(done, done);
  });

  beforeEach(function() {
    email = 'test@test.com';
    password = 'P4ssw0rd!';

    domElement = DOM.clone(productionDOMElement);
    document.body.appendChild(domElement);
    trapSubmitFor(domElement);

    formValidationError = new FormValidationError(domElement);
    submitButtonSpinner = new SubmitButtonSpinner(domElement);
    userData = new UserData();

    authenticationForm = new AuthenticationForm(domElement, formValidationError, submitButtonSpinner, userData);
  });

  afterEach(function() {
    document.body.removeChild(domElement);
    removeTrap();
  });

  describe('when submitted with incorrect data', function() {
    beforeEach(function() {
      this.sinon.spy(formValidationError, 'show');
    });

    it('displays the appropriate error message', function(done) {
      authenticationForm.submit({
        'email': 'garbage',
        'password': 'P4ssw0rd!'
      })
      .catch(function(error) {
        expect(formValidationError.show).to.have.been.called;
        expect(formValidationError.getMessage(), 'error message text').to.equal(error.message);
      })
      .then(done, done);
    });
  });

  describe('when the data is correct', function() {
    var theTimestamp;

    beforeEach(function() {
      this.sinon.stub(userData, 'authenticateUser').returns(Promise.resolve());
      this.sinon.stub(userData, 'set').returns(Promise.resolve());
      theTimestamp = this.sinon.match.number;
    });

    it('asks userData to authenticate the new user and then record the login timestamp', function() {
      return authenticationForm
      .submit({
        'email': email,
        'password': password
      })
      .then(function() {
        expect(userData.authenticateUser).to.have.been.calledWith(email, password);
        expect(userData.set).to.have.been.calledWith('timestamps/lastLogin', theTimestamp);
        expect(userData.set).to.have.been.calledAfter(userData.authenticateUser);
      });
    });

    describe('when userData fulfills the authentication request', function() {
      beforeEach(function() {
        userData.authenticateUser.returns(Promise.resolve());
        this.sinon.spy(domElement, 'submit');
      });

      it('submits the DOM form', function() {
        authenticationForm
        .submit({
          'email': email,
          'password': password
        })
        .then(function() {
          expect(domElement.submit).to.have.been.called;
        });
      });

      it('hides any previous validation error message', function() {
        formValidationError.show('Something’s not valid');

        return authenticationForm
        .submit({
          'email': email,
          'password': password
        })
        .then(function() {
          expect(formValidationError.isShown()).to.be.false;
        });
      });
    });

    describe('when userData rejects the authentication request', function() {
      var userDataError;

      beforeEach(function() {
        userDataError = new Error('Something bad happened');
        userData.authenticateUser.returns(Promise.reject(userDataError));
        this.sinon.spy(formValidationError, 'show');

        return authenticationForm.submit({
          'email': email,
          'password': password
        });
      });

      it('displays the error', function() {
        expect(formValidationError.show).to.have.been.called;
        expect(formValidationError.getMessage(), 'error message text').to.equal(userDataError.message);
      });
    });

    describe('progress indication', function() {
      var userDataRequest = {};
      var doAuthenticationWork;

      beforeEach(function() {
        userData.authenticateUser.returns(new Promise(function(resolve, reject) {
          userDataRequest.simulateSuccess = resolve;
          userDataRequest.simulateFailure = reject;
        }));
      });

      beforeEach(function() {
        expect(submitButtonSpinner.isShown(), 'progress indicator is hidden initially').to.be.false;
        expect(authenticationForm.isSubmitDisabled(), 'submit button is enabled initially').to.be.false;

        doAuthenticationWork = authenticationForm.submit({
          'email': email,
          'password': password
        });

        expect(submitButtonSpinner.isShown(), 'progress indicator is shown while doing the work').to.be.true;
        expect(authenticationForm.isSubmitDisabled(), 'submit button is disabled while doing the work').to.be.true;
      });

      describe('when userData succeeds', function() {
        beforeEach(function(done) {
          userDataRequest.simulateSuccess();
          doAuthenticationWork.then(done, done);
        });

        it('returns form to the initial state', function() {
          expect(submitButtonSpinner.isShown(), 'progress indicator is hidden').not.to.be.true;
          expect(authenticationForm.isSubmitDisabled(), 'submit button is reenabled').to.be.false;
        });
      });

      describe('when userData fails', function() {
        beforeEach(function(done) {
          userDataRequest.simulateFailure(new Error('Something bad happened'));
          doAuthenticationWork.then(done, done);
        });

        it('returns form to the initial state', function() {
          expect(submitButtonSpinner.isShown(), 'progress indicator is hidden').not.to.be.true;
          expect(authenticationForm.isSubmitDisabled(), 'submit button is reenabled').to.be.false;
        });
      });
    });
  });

  describe('password recovery link', function() {
    beforeEach(function(done) {
      authenticationForm.fill({
        'email': email,
        'password': password
      });

      authenticationForm.submitEmailToPasswordRecoveryPage();
      this.helpers.waitForReload(submitTrap)
      .then(done, done);
    });

    it('submits email to the password recovery page', function() {
      var submitURL = getSubmitURL();

      expect(submitURL).to.include(Navigation.getPathForPage('PasswordRecoveryPage'));
      expect(submitURL).to.include('email=' + encodeURIComponent(email));
      expect(submitURL).not.to.include(password);
    });

    function getSubmitURL() {
      var submitLocation = submitTrap.contentWindow.location;
      return submitLocation.pathname + submitLocation.search;
    }
  });

  function trapSubmitFor(form) {
    submitTrap = document.createElement('iframe');
    submitTrap.name = 'submit-trap';
    document.body.appendChild(submitTrap);
    form.target = submitTrap.name;
  }

  function removeTrap() {
    document.body.removeChild(submitTrap);
  }

  function getProductionDOMElement(context) {
    return H.navigateTo(Navigation.getPathForPage('IndexPage'))
    .then(function() {
      return DOM.require('#authentication-form', context.app);
    });
  }
});

var AuthenticationForm = require('app/pages/index/authentication-form');
var Navigation = require('app/widgets/navigation');
var FormValidationError = require('app/widgets/form-validation-error');
var SubmitButtonSpinner = require('app/widgets/submit-button-spinner');
var UserData = require('app/services/user-data');
var DOM = require('app/services/dom');
var Promise = require('app/services/promise');
