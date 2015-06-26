'use strict';

var DOM = require('app/services/dom');
var Form = require('app/super/form');
var inherits = require('inherits');
var ClientListFormValidator = require('./client-list-form-validator');

inherits(ClientListForm, Form);

function ClientListForm(domElement, formValidationError, submitButtonSpinner, clientList) {
  var loadSpinner = DOM.require('#client-list-spinner', domElement);
  var submitButton = DOM.require('button[type="submit"]', domElement);

  loadClientList();

  this.requiredFields = ['client-list'];

  this.isLoadSpinnerDisplayed = function() {
    return loadSpinner.style.display !== 'none';
  };

  this.getList = function() {
    return domElement['client-list'].value;
  };

  this.processForm = function(formData) {
    return clientList.save(formData['client-list']);
  };

  var formValidator = new ClientListFormValidator();

  Form.call(this, domElement, formValidator, formValidationError, submitButtonSpinner);

  function loadClientList() {
    disableSubmitButton();
    showLoadSpinner();

    clientList.load()
    .then(function(clientListText) {
      domElement['client-list'].value = clientListText;
    })
    .catch(formValidationError.show)
    .finally(function() {
      enableSubmitButton();
      hideLoadSpinner();
    });
  }

  function showLoadSpinner() {
    loadSpinner.style.display = 'inline';
  }

  function hideLoadSpinner() {
    loadSpinner.style.display = 'none';
  }

  function disableSubmitButton() {
    submitButton.disabled = true;
  }

  function enableSubmitButton() {
    submitButton.disabled = false;
  }
}

module.exports = ClientListForm;
