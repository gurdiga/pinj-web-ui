'use strict';

function FormSuccessMessage(formDOMElement) {
  var domElement = createMessageDOMElement();

  formDOMElement.appendChild(domElement);

  this.show = function(text) {
    domElement.style.display = 'block';
    domElement.firstElementChild.textContent = text;
  };

  this.hide = function() {
    domElement.style.display = 'none';
  };

  this.getText = function() {
    return domElement.firstChild.textContent;
  };

  function createMessageDOMElement() {
    var p = document.createElement('p');
    var div = document.createElement('div');
    div.className = 'success-message';
    div.style.display = 'none';
    div.appendChild(p);
    return div;
  }
}

module.exports = FormSuccessMessage;
