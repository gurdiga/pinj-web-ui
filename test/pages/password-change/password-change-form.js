'use strict';

var PasswordChangeForm = require('app/pages/password-change/password-change-form');
var FormValidationError = require('app/widgets/form-validation-error');
var SubmitButtonSpinner = require('app/widgets/submit-button-spinner');
var Navigation = require('app/widgets/navigation');
var DOM = require('app/services/dom');

describe('PasswordChangeForm', function() {
  var passwordChangeForm, domElement, formValidationError, submitButtonSpinner;
  var productionDOMElement;

  before(function() {
    return getProductionDOMElement(this)
    .then(function(domElement) { productionDOMElement = domElement; });
  });

  before(function() {
    domElement = DOM.clone(productionDOMElement);

    formValidationError = new FormValidationError(domElement);
    submitButtonSpinner = new SubmitButtonSpinner(domElement);
    passwordChangeForm = new PasswordChangeForm(domElement, formValidationError, submitButtonSpinner);
  });

  describe('behaviour', function() {
    it('POSTs to the appropriate URL', function() {
      var form = domElement;
      expect(form.method, 'method').to.equal('post');
      expect(form.action, 'action').to.equal('https://pinj-scripts.herokuapp.com/echo?to=%2Fpassword-change.html');
    });
  });

  describe('UI elements', function() {
    var fieldset;

    before(function() {
      fieldset = DOM.require('fieldset', domElement);
    });

    it('has an appropriately styled fieldset', function() {
      expect(fieldset).to.exist;
      expect(fieldset.className, 'classes').to.equal('glued-fields');
    });

    it('has a field for the old password', function() {
      var field = DOM.require('input[name="old-password"]', fieldset);
      expect(field.type, 'type').to.equal('password');
      expect(field.placeholder, 'placeholder').to.equal('Parola veche');
    });

    it('has a field for the new password', function() {
      var field = DOM.require('input[name="new-password"]', fieldset);
      expect(field.type, 'type').to.equal('password');
      expect(field.placeholder, 'placeholder').to.equal('Parola nouă');
    });

    it('has a field for the new password’s confirmation', function() {
      var field = DOM.require('input[name="new-password-confirmation"]', fieldset);
      expect(field.type, 'type').to.equal('password');
      expect(field.placeholder, 'placeholder').to.equal('Confirmarea');
    });

    it('has a submit button', function() {
      var button = DOM.require('button', domElement);
      expect(button).to.exist;
      expect(button.type, 'type').to.equal('submit');
      expect(button.textContent, 'text label').to.equal('Schimbă parola');
    });
  });

  describe('validation messages', function() {
    it.skip('displays validation error messages', function() {
      // TODO
    });
  });

  function getProductionDOMElement(context) {
    return H.navigateTo(Navigation.getPathForPage('PasswordChangePage'))
    .then(function() {
      return DOM.require('#password-change-form', context.app);
    });
  }
});
