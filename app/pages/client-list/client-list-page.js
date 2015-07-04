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

function checkPayment(userData, accountSuspended, paymentOverdue) {
  userData.get(config.TIMESTAMPS_PATH)
  .then(function(timestamps) {
    var inTrial = Date.now() - timestamps.registration <= config.TRIAL_PERIOD;
    var isPaymentUpToDate = !!timestamps.lastPayment && (Date.now() - timestamps.lastPayment <= config.PAYMENT_PERIOD);
    var inGracePeriod = Date.now() - (timestamps.lastPayment || timestamps.registration) <= config.PAYMENT_PERIOD + config.GRACE_PERIOD;

    /*jshint maxcomplexity:5*/
    if (inTrial) return;
    else if (isPaymentUpToDate) return;
    else if (inGracePeriod) displayElement(paymentOverdue, getGraceDaysLeft(timestamps));
    else displayElement(accountSuspended);
  });
}

function displayElement(domElement, value) {
  domElement.style.display = 'block';
  if (value) domElement.textContent = domElement.textContent.replace('#', value);
}

var ONE_DAY = 24 * 3600 * 1000;

function getGraceDaysLeft(timestamps) {
  var hasAnyPayments = !!timestamps.lastPayment;
  var lastPaymentPeriodEnd = hasAnyPayments ?
    timestamps.lastPayment + config.PAYMENT_PERIOD :
    timestamps.registration + config.TRIAL_PERIOD;

  return Math.round((config.GRACE_PERIOD - (Date.now() - lastPaymentPeriodEnd)) / ONE_DAY);
}

module.exports = ClientListPage;

var config = require('app/config');
var DOM = require('app/services/dom');
var FormValidationError = require('app/widgets/form-validation-error');
var SubmitButtonSpinner = require('app/widgets/submit-button-spinner');
var ClientList = require('./client-list');
var ClientListForm = require('./client-list-form');
