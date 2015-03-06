'use strict';

var PasswordRecoveryForm = require('app/pages/password-recovery/password-recovery-form');
var Navigation = require('app/widgets/navigation');
var FormValidationError = require('app/widgets/form-validation-error');
var SubmitButtonSpinner = require('app/widgets/submit-button-spinner');
var UserData = require('app/services/user-data');
var config = require('app/config');
var DOM = require('app/services/dom');
var Promise = require('app/services/promise');

describe('PasswordRecoveryForm', function() {
  var passwordRecoveryForm, domElement, formValidationError, submitButtonSpinner, userData, email;
  var productionDOMElement;

  before(function(done) {
    getProductionDOMElement(this)
    .then(function(domElement) { productionDOMElement = domElement; })
    .then(done, done);
  });

  beforeEach(function() {
    domElement = DOM.clone(productionDOMElement);

    formValidationError = new FormValidationError(domElement);
    submitButtonSpinner = new SubmitButtonSpinner(domElement);
    userData = new UserData(config.FIREBASE_URL);
    email = 'test@test.com';

    passwordRecoveryForm = new PasswordRecoveryForm(domElement, formValidationError, submitButtonSpinner, userData, email);
  });

  it('prefills the given email', function() {
    expect(passwordRecoveryForm.getEmail()).to.equal(email);
  });

  describe('when submitted with incorrect data', function() {
    beforeEach(function() {
      this.sinon.spy(formValidationError, 'show');
    });

    it('displays an appropriate error message', function(done) {
      passwordRecoveryForm.submit({
        'email': 'garbage'
      })
      .catch(function(error) {
        expect(formValidationError.show).to.have.been.called;
        expect(formValidationError.getMessage(), 'error message text').to.equal(error.message);
      })
      .then(done, done);
    });
  });

  describe('when the data is correct', function() {
    beforeEach(function() {
      email = 'test@test.com';
      this.sinon.stub(userData, 'sendPasswordRecoveryEmail').returns(Promise.resolve());
    });

    it('asks userData to send the password recovery email', function(done) {
      passwordRecoveryForm
      .submit({
        'email': email
      })
      .catch(done);

      onNextTick(function() {
        expect(userData.sendPasswordRecoveryEmail).to.have.been.calledWith(email);
        done();
      });
    });

    describe('when userData fulfills the password recovery request', function() {
      beforeEach(function() {
        userData.sendPasswordRecoveryEmail.returns(Promise.resolve());
      });

      it('emits the submit event', function(done) {
        passwordRecoveryForm
        .on('submit', done)
        .submit({
          'email': email
        })
        .catch(done);
      });

      it('hides any previous validation error message', function(done) {
        formValidationError.show('Something’s not valid');

        passwordRecoveryForm
        .submit({
          'email': email
        })
        .catch(done);

        onNextTick(function() {
          expect(formValidationError.isShown()).to.be.false;
          done();
        });
      });
    });

    describe('when userData rejects the password recovery request', function() {
      var userServiceError;

      beforeEach(function() {
        userServiceError = new Error('Something bad happened');
        userData.sendPasswordRecoveryEmail.returns(Promise.reject(userServiceError));
        this.sinon.spy(formValidationError, 'show');
      });

      it('displays the error', function(done) {
        var passwordRecoveryRequest = passwordRecoveryForm.submit({
          'email': email
        });

        expect(passwordRecoveryRequest).to.be.rejected
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
        userData.sendPasswordRecoveryEmail.returns(new Promise(function(resolve, reject) {
          userServiceRequest.simulateSuccess = resolve;
          userServiceRequest.simulateFailure = reject;
        }));
      });

      describe('on submit', function() {
        it('on submit shows the progress indicator and prevents multiple submits', function() {
          expect(submitButtonSpinner.isShown(), 'progress indicator is hidden initially').to.be.false;
          expect(passwordRecoveryForm.isSubmitDisabled()).to.be.false;

          submitForm();

          expect(submitButtonSpinner.isShown(), 'progress indicator is shown').to.be.true;
          expect(passwordRecoveryForm.isSubmitDisabled()).to.be.true;
        });
      });

      describe('when userData succeeds', function() {
        beforeEach(function(done) {
          submitForm();
          userServiceRequest.simulateSuccess();
          onNextTick(done);
        });

        it('hides the submit spinner', function() {
          expect(submitButtonSpinner.isShown(), 'submit spinner not to be shown').not.to.be.true;
        });
      });

      describe('when userData fails', function() {
        beforeEach(function(done) {
          submitForm();
          userServiceRequest.simulateFailure();
          onNextTick(done);
        });

        it('hides the submit spinner', function() {
          expect(submitButtonSpinner.isShown(), 'submit spinner not to be shown').not.to.be.true;
        });
      });

      function submitForm() {
        passwordRecoveryForm.submit({
          'email': email
        });
      }
    });

    function onNextTick(f) {
      setTimeout(f);
    }

    function bubbleErrors(f) {
      setTimeout(f);
    }
  });

  function getProductionDOMElement(context) {
    return H.navigateTo(Navigation.getPathForPage('PasswordRecoveryPage'))
    .then(function() {
      return DOM.require('#password-recovery-form', context.app);
    });
  }
});
