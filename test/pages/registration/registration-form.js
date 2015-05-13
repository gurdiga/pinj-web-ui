'use strict';

describe('RegistrationForm', function() {
  var registrationForm, domElement, formValidationError, submitButtonSpinner, userData;
  var productionDOMElement;

  before(function() {
    return getProductionDOMElement(this)
    .then(function(domElement) { productionDOMElement = domElement; });
  });

  beforeEach(function() {
    domElement = DOM.clone(productionDOMElement);
    document.body.appendChild(domElement);

    formValidationError = new FormValidationError(domElement);
    submitButtonSpinner = new SubmitButtonSpinner(domElement);
    userData = new UserData();
    this.sinon.stub(userData, 'registerUser');
    this.sinon.stub(userData, 'authenticateUser');
    this.sinon.stub(userData, 'set').returns(Promise.resolve());

    registrationForm = new RegistrationForm(domElement, formValidationError, submitButtonSpinner, userData);
  });

  afterEach(function() {
    document.body.removeChild(domElement);
  });

  describe('when submitted with incorrect data', function() {
    beforeEach(function() {
      this.sinon.spy(formValidationError, 'show');
    });

    it('displays an appropriate error message', function() {
      return registrationForm.submit({
        'email': 'garbage',
        'password': 'P4ssw0rd!',
        'password-confirmation': 'P4ssw0rd!'
      })
      .catch(function(error) {
        expect(formValidationError.show).to.have.been.called;
        expect(formValidationError.getMessage(), 'error message text').to.equal(error.message);
      });
    });
  });

  describe('when the data is correct', function() {
    var email, password;
    var submitTrap;

    beforeEach(function() {
      trapSubmitFor(domElement);

      email = 'test@test.com';
      password = 'P4ssw0rd!';

      userData.authenticateUser.returns(Promise.resolve());
    });

    it('asks userData to register and authenticate the new user', function(done) {
      userData.registerUser.returns(Promise.resolve());

      registrationForm
      .submit({
        'email': email,
        'password': password,
        'password-confirmation': password
      })
      .catch(done);

      onNextTick(function() {
        expect(userData.registerUser).to.have.been.calledWith(email, password);
        expect(userData.authenticateUser).to.have.been.calledWith(email, password);
        done();
      });
    });

    describe('when userData fulfills the registration request', function() {
      var theTimestamp;

      beforeEach(function() {
        userData.registerUser.returns(Promise.resolve());
        this.sinon.spy(domElement, 'submit');
        theTimestamp = sinon.match.number;
      });

      it('asks it to also record registration and authentication timestamps and then submits the DOM form', function() {
        return registrationForm
        .submit({
          'email': email,
          'password': password,
          'password-confirmation': password
        })
        .then(function() {
          expect(userData.set).to.have.been.calledWith('timestamps/registration', theTimestamp);
          expect(userData.set).to.have.been.calledWith('timestamps/lastLogin', theTimestamp);
          expect(domElement.submit).to.have.been.called;
        });
      });

      it('hides any previous validation error message', function(done) {
        formValidationError.show('Something’s not valid');

        registrationForm
        .submit({
          'email': email,
          'password': password,
          'password-confirmation': password
        })
        .catch(done);

        onNextTick(function() {
          expect(formValidationError.isShown()).to.be.false;
          done();
        });
      });
    });

    describe('when userData rejects the registration request', function() {
      var userServiceError;

      beforeEach(function() {
        userServiceError = new Error('Something bad happened');
        userData.registerUser.returns(Promise.reject(userServiceError));
        this.sinon.spy(formValidationError, 'show');
      });

      it('displays the error', function(done) {
        var registrationRequest = registrationForm.submit({
          'email': email,
          'password': password,
          'password-confirmation': password
        });

        expect(registrationRequest).to.be.rejected
        .and.notify(function() {
          bubbleErrors(function() {
            expect(formValidationError.show).to.have.been.called;
            expect(formValidationError.getMessage(), 'error message text').to.equal(userServiceError.message);
            done();
          });
        });

      });
    });

    describe('waiting', function() {
      var userServiceRequest = {};

      beforeEach(function() {
        userData.registerUser.returns(new Promise(function(resolve, reject) {
          userServiceRequest.simulateSuccess = resolve;
          userServiceRequest.simulateFailure = reject;
        }));
      });

      describe('on submit', function() {
        var submittedTheForm;

        it('shows the progress indicator and prevents multiple submits on submit', function(done) {
          expect(submitButtonSpinner.isShown(), 'progress indicator is hidden initially').to.be.false;
          expect(registrationForm.isSubmitDisabled()).to.be.false;

          submittedTheForm = submitForm();

          expect(submitButtonSpinner.isShown(), 'progress indicator is shown').to.be.true;
          expect(registrationForm.isSubmitDisabled()).to.be.true;

          submittedTheForm.then(done, done);
          userServiceRequest.simulateSuccess();
        });
      });

      describe('when userData succeeds', function() {
        beforeEach(function(done) {
          submitForm();
          userServiceRequest.simulateSuccess();
          onNextTick(done);
        });

        it('hides the progress indicator after the operation succeedes', function() {
          expect(submitButtonSpinner.isShown(), 'progress indicator not to be shown').not.to.be.true;
        });
      });

      describe('when userData fails', function() {
        beforeEach(function(done) {
          submitForm();
          userServiceRequest.simulateFailure();
          onNextTick(done);
        });

        it('hides the progress indicator after the operation fails', function() {
          expect(submitButtonSpinner.isShown(), 'progress indicator not to be shown').not.to.be.true;
        });
      });

      function submitForm() {
        return registrationForm.submit({
          'email': email,
          'password': password,
          'password-confirmation': password
        });
      }
    });

    afterEach(removeTrap);

    function onNextTick(f) {
      setTimeout(f);
    }

    function trapSubmitFor(form) {
      submitTrap = document.createElement('iframe');
      submitTrap.name = 'submit-trap';
      document.body.appendChild(submitTrap);
      form.target = submitTrap.name;
    }

    function removeTrap() {
      document.body.removeChild(submitTrap);
    }

    function bubbleErrors(f) {
      setTimeout(f);
    }
  });

  function getProductionDOMElement(context) {
    return H.navigateTo(Navigation.getPathForPage('RegistrationPage'))
    .then(function() {
      return DOM.require('#registration-form', context.app);
    });
  }
});

var RegistrationForm = require('app/pages/registration/registration-form');
var Navigation = require('app/widgets/navigation');
var FormValidationError = require('app/widgets/form-validation-error');
var SubmitButtonSpinner = require('app/widgets/submit-button-spinner');
var UserData = require('app/services/user-data');
var DOM = require('app/services/dom');
var Promise = require('app/services/promise');
