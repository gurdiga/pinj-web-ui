'use strict';

describe('Form success message', function() {
  var message;
  var formDomElement, messageDOMElement;

  beforeEach(function() {
    formDomElement = prepareForm();
    message = new FormSuccessMessage(formDomElement);
    messageDOMElement = formDomElement.lastChild;
  });

  it('appends an invisible .success-message to the given form DOM element', function() {
    expect(messageDOMElement, 'message DOM element').to.exist;
    expect(messageDOMElement.style.display, 'hidden').to.equal('none');
  });

  it('can show a specific text', function() {
    var text = 'Hurray!';
    message.show(text);
    expect(messageDOMElement.style.display, 'DOM element is visible').to.equal('block');
    expect(messageDOMElement.firstElementChild.textContent, 'text').to.equal(text);
  });

  it('can tell its text', function() {
    var text = 'Hurray again!';
    message.show(text);
    expect(message.getText()).to.equal(text);
  });

  it('can be hidden', function() {
    message.show('Form processing succeeded');
    message.hide();
    expect(messageDOMElement.style.display, 'DOM element is hidden').to.equal('none');
  });

  function prepareForm() {
    var form = document.createElement('form');
    var submitButton = document.createElement('button');
    submitButton.type = 'submit';
    form.appendChild(submitButton);
    return form;
  }
});

var FormSuccessMessage = require('app/widgets/form-success-message');
