'use strict';

var DOM = require('app/services/dom');
var assertMembers = require('app/util/assert-members');
var emit = require('app/util/emit');

function Form(domElement, formValidator, formValidationError, submitButtonSpinner) {
  var context = this;
  var submitButton;

  assertMembers(this, {
    'requiredFields': 'array',
    'processForm': 'method'
  });

  assertDOMElements();
  listenForSubmitEvent();

  function assertDOMElements() {
    var requiredDOMElements = context.requiredDOMElements || [];

    requiredDOMElements.forEach(function(name) {
      DOM.require(name, domElement);
    });

    submitButton = DOM.require('button[type="submit"]', domElement);

    context.requiredFields.forEach(function(name) {
      DOM.require('[name="' + name + '"]', domElement);
    });
  }

  function listenForSubmitEvent() {
    domElement.addEventListener('submit', function(event) {
      event.preventDefault();
      processForm();
    });
  }

  function processForm() {
    formValidationError.hide();
    submitButtonSpinner.show();

    return formValidator.validate(getFormData())
    .then(context.processForm)
    .catch(formValidationError.show)
    .finally(submitButtonSpinner.hide)
    .then(emit(domElement, 'finished-work'));
  }

  function getFormData() {
    return context.requiredFields.reduce(function(data, name) {
      data[name] = domElement[name].value;
      return data;
    }, {});
  }

  this.fill = function(data) {
    context.requiredFields.forEach(function(name) {
      if (!(name in data)) throw new Error('“' + name + '” is a required field');
      domElement[name].value = data[name];
    });
  };

  this.submit = function(data) {
    this.fill(data);
    return processForm();
  };

  this.getErrorMessage = function() {
    return formValidationError.getMessage();
  };

  this.isSubmitDisabled = function() {
    return submitButton.disabled;
  };
}

module.exports = Form;
