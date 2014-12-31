'use strict';

var inherits = require('inherits');
var PageWithForm = require('app/super/page-with-form');
var DOM = require('app/services/dom');
var FormValidationError = require('app/widgets/form-validation-error');
var SubmitButtonSpinner = require('app/widgets/submit-button-spinner');
var ClientList = require('./client-list');
var ClientListForm = require('./client-list-form');

ClientListPage.PATH = '/client-list.html';

inherits(ClientListPage, PageWithForm);

function ClientListPage(domElement, userData) {
  var formDOMElement = DOM.require('#client-list-form', domElement);
  var notAuthenticatedMessageDOMElement = DOM.require('#not-authenticated', domElement);

  var formValidationError = new FormValidationError(formDOMElement);
  var submitButtonSpinner = new SubmitButtonSpinner(formDOMElement);
  var clientList = new ClientList(userData.getCurrentUserEmail());
  var authenticationForm = new ClientListForm(formDOMElement, formValidationError, submitButtonSpinner, clientList);

  this.isFormRelevant = function() {
    return userData.isCurrentlyAuthenticated();
  };

  PageWithForm.call(this, domElement, authenticationForm, formDOMElement, notAuthenticatedMessageDOMElement);
}

module.exports = ClientListPage;
