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

  if (userData.isCurrentlyAuthenticated()) {
    firstSearchNoteDOMElement.style.display = 'block';
  } else {
    firstSearchNoteDOMElement.style.display = 'none';
  }

  var accountSuspendedNoteDOMElement = DOM.require('#account-suspended', domElement);
  var paymentOverdueNoteDOMElement = DOM.require('#payment-overdue', domElement);
  checkPayment(userData, accountSuspendedNoteDOMElement, paymentOverdueNoteDOMElement);

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

function checkPayment(userData, accountSuspendedNoteDOMElement, paymentOverdueNoteDOMElement) {
  userData.get(config.TIMESTAMPS_PATH)
  .then(function(timestamps) {
    if (isInTrial(timestamps.registration)) return; // TODO: warn if last week of trial
    else if (isPaymentUpToDate(timestamps)) return;
    else if (isInGracePeriod(timestamps.lastPayment)) displayElement(paymentOverdueNoteDOMElement, getNumberOfDaysBeforeSuspendingAccount(timestamps));
    else displayElement(accountSuspendedNoteDOMElement);
  });
}

function displayElement(domElement, value) {
  domElement.style.display = 'block';
  if (value) domElement.textContent = domElement.textContent.replace('#', value);
}

module.exports = ClientListPage;

var config = require('app/config');
var DOM = require('app/services/dom');
var FormValidationError = require('app/widgets/form-validation-error');
var SubmitButtonSpinner = require('app/widgets/submit-button-spinner');
var ClientList = require('./client-list');
var ClientListForm = require('./client-list-form');
var isInTrial = require('./is-in-trial');
var isPaymentUpToDate = require('./is-payment-up-to-date');
var isInGracePeriod = require('./is-in-grace-period');
var getNumberOfDaysBeforeSuspendingAccount = require('./get-number-fo-days-before-suspending-account');
