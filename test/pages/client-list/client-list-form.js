'use strict';

var ClientListForm = require('app/pages/client-list/client-list-form');
var ClientListPage = require('app/pages/client-list/client-list-page');
var FormValidationError = require('app/widgets/form-validation-error');
var SubmitButtonSpinner = require('app/widgets/submit-button-spinner');
var ClientList = require('app/pages/client-list/client-list');
var DOM = require('app/services/dom');
var Promise = require('app/services/promise');

describe('ClientListForm', function() {
  var clientListForm, domElement, formValidationError, submitButtonSpinner, clientList;
  var productionDOMElement, currentUserEmail, clientListLoadRequest, clientListSaveRequest, clientListText;

  before(function(done) {
    getProductionDOMElement(this)
    .then(function(domElement) { productionDOMElement = domElement; })
    .then(done, done);
  });

  beforeEach(function() {
    domElement = DOM.clone(productionDOMElement);
    currentUserEmail = 'test@test.com';
    clientListLoadRequest = {};

    clientList = new ClientList(currentUserEmail);
    this.sinon.stub(clientList, 'load').returns(createSimulatedRequest(clientListLoadRequest));

    formValidationError = new FormValidationError(domElement);
    submitButtonSpinner = new SubmitButtonSpinner(domElement);
    clientListForm = new ClientListForm(domElement, formValidationError, submitButtonSpinner, clientList);
  });

  it('shows a spinner and disables the submit button initially', function() {
    expect(clientListForm.isLoadSpinnerDisplayed()).to.be.true;
    expect(clientListForm.isSubmitDisabled()).to.be.true;
  });

  describe('initial client list loading', function() {
    describe('when ClientList.load() succeeds', function() {
      beforeEach(function(done) {
        clientListText = 'a list of new-line separated items';
        clientListLoadRequest.simulateSuccess(clientListText);

        onNextTick(done);
      });

      it('fills the client list field with the value returned', function() {
        expect(clientListForm.getList()).to.equal(clientListText);
      });

      it('re-enables the submit button', function() {
        expect(clientListForm.isSubmitDisabled()).to.be.false;
      });
    });

    describe('when ClientList.load() fails', function() {
      var clientListLoadError;

      beforeEach(function(done) {
        clientListLoadError = new Error('Something bad happened');
        clientListLoadRequest.simulateFailure(clientListLoadError);

        onNextTick(done);
      });

      it('displays the error message', function() {
        expect(clientListForm.getErrorMessage()).to.equal(clientListLoadError.message);
      });

      it('hides the load spinner', function() {
        expect(clientListForm.isLoadSpinnerDisplayed()).to.be.false;
      });

      it('re-enables the submit button', function() {
        expect(clientListForm.isSubmitDisabled()).to.be.false;
      });
    });
  });

  describe('client list saving', function() {
    beforeEach(function(done) {
      clientListLoadRequest.simulateSuccess();

      clientListText = 'a list of new-line separated items';
      clientListSaveRequest = {};
      this.sinon.stub(clientList, 'save').returns(createSimulatedRequest(clientListSaveRequest));

      onNextTick(done);
    });

    it('on submit shows the submit spinner and prevents multiple submits', function() {
      expect(submitButtonSpinner.isShown(), 'submit spinner is hidden initially').to.be.false;
      expect(clientListForm.isSubmitDisabled()).to.be.false;

      submitForm();

      expect(submitButtonSpinner.isShown(), 'submit spinner is shown').to.be.true;
      expect(clientListForm.isSubmitDisabled()).to.be.true;
    });

    describe('when ClientList.save() succeeds', function() {
      beforeEach(function(done) {
        submitForm();
        clientListSaveRequest.simulateSuccess();
        onNextTick(done);
      });

      it('hides the submit spinner', function() {
        expect(submitButtonSpinner.isShown(), 'submit spinner not to be shown').not.to.be.true;
      });

      it('re-enables the submit button', function() {
        expect(clientListForm.isSubmitDisabled()).to.be.false;
      });
    });

    describe('when ClientList.save() fails', function() {
      var clientListSaveError;

      beforeEach(function(done) {
        this.sinon.spy(formValidationError, 'show');

        submitForm();
        clientListSaveError = new Error('Something bad happened');
        clientListSaveRequest.simulateFailure(clientListSaveError);

        onNextTick(done);
      });

      it('displays the error message', function() {
        expect(formValidationError.show).to.have.been.calledWith(clientListSaveError);
      });

      it('hides the submit spinner', function() {
        expect(submitButtonSpinner.isShown()).not.to.be.true;
      });

      it('re-enables the submit button', function() {
        expect(clientListForm.isSubmitDisabled()).to.be.false;
      });
    });
    
    function submitForm() {
      clientListForm.submit({
        'client-list': clientListText
      });
    }
  });

  function getProductionDOMElement(context) {
    return H.navigateTo(ClientListPage.PATH)
    .then(function() {
      return DOM.require('#client-list-form', context.app);
    });
  }

  function onNextTick(f) {
    setTimeout(f);
  }

  function createSimulatedRequest(request) {
    return new Promise(function(resolve, reject) {
      request.simulateSuccess = resolve;
      request.simulateFailure = reject;
    });
  }
});
