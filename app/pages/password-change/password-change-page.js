'use strict';

var inherits = require('inherits');

var PageWithForm = require('app/super/page-with-form');
var PageWithNavigation = require('app/super/page-with-navigation');

inherits(PasswordChangePage, PageWithForm);
inherits(PasswordChangePage, PageWithNavigation);

function PasswordChangePage(domElement, userData) {
  var formDOMElement = DOM.require(MetaData.FORM_SELECTOR, domElement);
  var notAuthenticatedMessageDOMElement = DOM.require(MetaData.NOT_AUTHENTICATED_MESSAGE_ID, domElement);

  var formSuccessMessage = new FormSuccessMessage(formDOMElement);
  var formValidationError = new FormValidationError(formDOMElement);
  var submitButtonSpinner = new SubmitButtonSpinner(formDOMElement);
  var passwordChangeForm = new PasswordChangeForm(
    formDOMElement,
    formValidationError,
    formSuccessMessage,
    submitButtonSpinner,
    userData
  );

  this.isFormRelevant = function() {
    return userData.isCurrentlyAuthenticated();
  };

  PageWithForm.call(this, domElement, passwordChangeForm, formDOMElement, notAuthenticatedMessageDOMElement);
  PageWithNavigation.call(this, domElement, userData);
}

var DOM = require('app/services/dom');
var FormValidationError = require('app/widgets/form-validation-error');
var FormSuccessMessage = require('app/widgets/form-success-message');
var SubmitButtonSpinner = require('app/widgets/submit-button-spinner');

var PasswordChangeForm = require('./password-change-form');
var MetaData = require('./meta-data');

module.exports = PasswordChangePage;
