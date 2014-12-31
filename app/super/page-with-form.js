'use strict';

var assertMembers = require('app/util/assert-members');

function PageWithForm(domElement, form, formDOMElement, formIrrelevantMessageDOMElement) {
  assertMembers(this, {
    'isFormRelevant': 'method'
  });

  if (this.isFormRelevant()) {
    formDOMElement.style.display = 'block';
    formIrrelevantMessageDOMElement.style.display = 'none';
  } else {
    formDOMElement.style.display = 'none';
    formIrrelevantMessageDOMElement.style.display = 'block';
  }

  this.submitForm = function(data) {
    return form.submit(data);
  };

  this.isFormHidden = function() {
    return formDOMElement.style.display === 'none';
  };

  this.isFormIrrelevantMessageDisplayed = function() {
    return formIrrelevantMessageDOMElement.style.display === 'block';
  };
}

module.exports = PageWithForm;
