'use strict';

var DOM = require('app/services/dom');

function FormValidationError(formDOMElement) {
  var submitButton = DOM.require('button[type="submit"]', formDOMElement);
  var domElement = createErrorMessageDOMElement();

  submitButton.parentNode.insertBefore(domElement, submitButton);

  function createErrorMessageDOMElement() {
    var p = document.createElement('p');
    var div = document.createElement('div');
    div.className = 'validation-error';
    div.style.display = 'none';
    div.appendChild(p);
    return div;
  }

  this.show = function(error) {
    domElement.firstChild.textContent = error.message;
    domElement.style.display = 'block';
  }.bind(this);

  this.hide = function() {
    domElement.style.display = 'none';
  };

  this.getDOMElement = function() {
    return domElement;
  };

  this.getMessage = function() {
    return domElement.firstChild.textContent;
  };

  this.isShown = function() {
    return domElement.style.display === 'block';
  };
}

module.exports = FormValidationError;
