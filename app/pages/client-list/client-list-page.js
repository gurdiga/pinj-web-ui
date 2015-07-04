'use strict';

var inherits = require('inherits');
var PageWithForm = require('app/super/page-with-form');
var PageWithNavigation = require('app/super/page-with-navigation');

inherits(ClientListPage, PageWithForm);
inherits(ClientListPage, PageWithNavigation);

function ClientListPage(domElement, userData) {
  var formDOMElement = DOM.require('#client-list-form', domElement);
  var notAuthenticatedMessageDOMElement = DOM.require('#not-authenticated', domElement);
  var firstSearchNoteDOMElement = DOM.require('#client-list-form+p.information.message', domElement);
  var paymentOverdueNoteDOMElement = DOM.require('#account-suspended', domElement);

  if (userData.isCurrentlyAuthenticated()) {
    firstSearchNoteDOMElement.style.display = 'block';
  } else {
    firstSearchNoteDOMElement.style.display = 'none';
  }

  checkPayment(userData, paymentOverdueNoteDOMElement);

  var formValidationError = new FormValidationError(formDOMElement);
  var submitButtonSpinner = new SubmitButtonSpinner(formDOMElement);
  var clientList = new ClientList(userData);
  var clientListForm = new ClientListForm(formDOMElement, formValidationError, submitButtonSpinner, clientList);

  this.isFormRelevant = function() {
    return userData.isCurrentlyAuthenticated();
  };

  PageWithForm.call(this, domElement, clientListForm, formDOMElement, notAuthenticatedMessageDOMElement);
  PageWithNavigation.call(this, domElement, userData);
}

function checkPayment(userData, paymentOverdueNoteDOMElement) {
  userData.get(config.LAST_PAYMENT_TIMESTAMP_PATH)
  .then(function(timestamp) {
    if (timestamp && Date.now() - timestamp > config.PAYMENT_PERIOD + config.PAYMENT_GRACE_PERIOD) {
      paymentOverdueNoteDOMElement.style.display = 'block';
    }
  });
}

module.exports = ClientListPage;

var config = require('app/config');
var DOM = require('app/services/dom');
var FormValidationError = require('app/widgets/form-validation-error');
var SubmitButtonSpinner = require('app/widgets/submit-button-spinner');
var ClientList = require('./client-list');
var ClientListForm = require('./client-list-form');
