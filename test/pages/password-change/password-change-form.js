'use strict';

describe('PasswordChangeForm', function() {
  var passwordChangeForm, domElement, formValidationError, submitButtonSpinner, userData;
  var productionDOMElement;

  before(function() {
    return getProductionDOMElement(this)
    .then(function(domElement) { productionDOMElement = domElement; });
  });

  beforeEach(function() {
    domElement = DOM.clone(productionDOMElement);

    formValidationError = new FormValidationError(domElement);
    submitButtonSpinner = new SubmitButtonSpinner(domElement);
    userData = new UserData();

    passwordChangeForm = new PasswordChangeForm(domElement, formValidationError, submitButtonSpinner, userData);
    this.sinon.stub(passwordChangeForm, 'processForm');
  });

  describe('UI elements', function() {
    var fieldset;

    beforeEach(function() {
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

    beforeEach(function() {
      submitButton = DOM.require('button', domElement);
      message = submitButton.previousSibling;
      expect(message).to.exist;
    });

    it('is hidden initially and displayed after submitting the form', function(done) {
      expect(message.style.display, 'before click message is hidden').to.equal('none');

      submitButton.click();

      Promise.nextTick().then(function() {
        expect(message.style.display, 'is displayed').to.equal('block');
        done();
      });
    });
  });

  describe('behaviour', function() {
    it('POSTs to the appropriate URL', function() {
      var form = domElement;
      expect(form.method, 'method').to.equal('post');
      expect(form.action, 'action').to.equal('https://pinj-scripts.herokuapp.com/echo?to=%2Fpassword-change.html');
    });
  });

  describe('when providing appropriate old password, new password and its confirmation', function() {
    var oldPassword, newPassword;

    beforeEach(function(done) {
      passwordChangeForm.processForm.restore();

      this.sinon.spy(formValidationError, 'show');
      this.sinon.spy(formValidationError, 'hide');
      this.sinon.spy(submitButtonSpinner, 'show');
      this.sinon.stub(userData, 'changePassword').returns(Promise.resolve());
      this.sinon.spy(submitButtonSpinner, 'hide');

      oldPassword = 'old-P4ssw0rd';
      newPassword = 'new-P4ssw0rd';
      passwordChangeForm.submit({
        'old-password': oldPassword,
        'new-password': newPassword,
        'new-password-confirmation': newPassword
      });

      Promise.nextTick().then(done);
    });

    it('hides any validation error', function() {
      expect(formValidationError.hide).to.have.been.called;
      expect(formValidationError.show).not.to.have.been.called;
    });

    it('displays the spinner before calling the User Data service', function() {
      expect(submitButtonSpinner.show).to.have.been.calledBefore(userData.changePassword);
    });

    it('asks User Data service to change the password', function() {
      expect(userData.changePassword).to.have.been.calledWith(oldPassword, newPassword);
    });

    it('hides the spinner after User Data has responded', function() {
      expect(submitButtonSpinner.hide).to.have.been.calledAfter(userData.changePassword);
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
var UserData = require('app/services/user-data');
