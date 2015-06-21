'use strict';

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

    it('has a submit button spinner', function() {
      var submitButton = DOM.require('button', domElement);
      var spinner = submitButton.nextSibling;
      expect(spinner.tagName, 'it’s an image').to.equal('IMG');
      expect(spinner.style.display, 'it’s initially hidden').to.equal('none');
      submitButton.click();
      expect(spinner.style.display, 'it’s displayed after the button is clicked').to.equal('inline');
    });
  });

  describe('validation error message', function() {
    var submitButton, message;

    before(function() {
      submitButton = DOM.require('button', domElement);
      message = submitButton.previousSibling;
      expect(message).to.exist;
    });

    it('is initially hidden', function(done) {
      expect(message.style.display, 'before click message is hidden').to.equal('none');

      submitButton.click();
      Promise.nextTick().then(done);
    });

    it('is displayed after submitting the form', function() {
      expect(message.style.display, 'is displayed').to.equal('block');
    });
  });

  function getProductionDOMElement(context) {
    return H.navigateTo(Navigation.getPathForPage('PasswordChangePage'))
    .then(function() {
      return DOM.require('#password-change-form', context.app);
    });
  }
});

var PasswordChangeForm = require('app/pages/password-change/password-change-form');
var FormValidationError = require('app/widgets/form-validation-error');
var SubmitButtonSpinner = require('app/widgets/submit-button-spinner');
var Navigation = require('app/widgets/navigation');
var DOM = require('app/services/dom');
var Promise = require('app/services/promise');
