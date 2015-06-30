'use strict';

function Tooltip(domElement) {
  domElement.classList.add('hidden');

  if (!domElement.firstChild) {
    var textNode = document.createTextNode('');
    domElement.appendChild(textNode);
  }

  var closeButton = document.createElement('button');
  closeButton.classList.add('close');
  domElement.appendChild(closeButton);

  closeButton.addEventListener('click', function() {
    this.hide();
  }.bind(this));

  this.show = function(text) {
    domElement.firstChild.textContent = text;
    domElement.classList.remove('hidden');
  };

  this.hide = function() {
    domElement.classList.add('hidden');
  };
}

module.exports = Tooltip;
