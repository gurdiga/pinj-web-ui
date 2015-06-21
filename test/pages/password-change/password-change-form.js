'use strict';

var PasswordChangeForm = require('app/pages/password-change/password-change-form');
var FormValidationError = require('app/widgets/form-validation-error');
var SubmitButtonSpinner = require('app/widgets/submit-button-spinner');
var Navigation = require('app/widgets/navigation');
var DOM = require('app/services/dom');

describe('PasswordChangeForm', function() {
  var passwordChangeForm, domElement, formValidationError, submitButtonSpinner;
  var productionDOMElement;

  beforeEach(function() {
    return getProductionDOMElement(this)
    .then(function(domElement) { productionDOMElement = domElement; });
  });

  beforeEach(function() {
    domElement = DOM.clone(productionDOMElement);

    formValidationError = new FormValidationError(domElement);
    submitButtonSpinner = new SubmitButtonSpinner(domElement);
    passwordChangeForm = new PasswordChangeForm(domElement, formValidationError, submitButtonSpinner);
  });

  describe('submit behaviour', function() {
    it.skip('POSTs', function() {
    });
  });

  describe('controls', function() {
    it('has a field for the old password', function() {
      var field = DOM.require('input[name="old-password"]', domElement);
      expect(field.type, 'type').to.equal('password');
      expect(field.placeholder, 'placeholder').to.equal('Parola veche');
    });

    it('has a field for the new password', function() {
      var field = DOM.require('input[name="new-password"]', domElement);
      expect(field.type, 'type').to.equal('password');
      expect(field.placeholder, 'placeholder').to.equal('Parola nouă');
    });

    it('has a field for the new password’s confirmation', function() {
      var field = DOM.require('input[name="new-password-confirmation"]', domElement);
      expect(field.type, 'type').to.equal('password');
      expect(field.placeholder, 'placeholder').to.equal('Confirmarea');
    });

    it('has a submit button', function() {
    });
  });

  it.skip('displays validation error messages', function() {
  });

  function getProductionDOMElement(context) {
    return H.navigateTo(Navigation.getPathForPage('PasswordChangePage'))
    .then(function() {
      return DOM.require('#password-change-form', context.app);
    });
  }
});
