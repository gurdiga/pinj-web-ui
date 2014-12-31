'use strict';

var DOM = require('app/services/dom');

SubmitButtonSpinner.IMG_PATH = '/common/images/spinner.gif';

function SubmitButtonSpinner(formDOMElement) {
  var submitButton = DOM.require('button[type="submit"]', formDOMElement);
  var domElement = createErrorMessageDOMElement();

  submitButton.parentNode.insertBefore(domElement, submitButton.nextSibling);

  function createErrorMessageDOMElement() {
    var img = document.createElement('img');
    img.className = 'submit-button-spinner';
    img.src = SubmitButtonSpinner.IMG_PATH;
    img.style.display = 'none';
    return img;
  }

  this.getSubmitButton = function() {
    return submitButton;
  };

  this.getDOMElement = function() {
    return domElement;
  };

  this.show = function() {
    domElement.style.display = 'inline';
    submitButton.disabled = true;
  };

  this.hide = function() {
    domElement.style.display = 'none';
    submitButton.disabled = false;
  }.bind(this);

  this.isShown = function() {
    return domElement.style.display === 'inline';
  };
}

module.exports = SubmitButtonSpinner;
