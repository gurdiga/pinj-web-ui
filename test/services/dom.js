'use strict';

var DOM = require('app/services/dom');

describe('DOM', function() {
  describe('require', function() {
    var returnValue;

    it('delegates to document.querySelector', function() {
      returnValue = {'the': 'dom object'};
      this.sinon.stub(document, 'querySelector').returns(returnValue);

      expect(DOM.require('#selector'), 'return value').to.equal(returnValue);
      expect(document.querySelector).to.have.been.calledWith('#selector');
    });

    it('accepts a context element as the second argument', function() {
      var context = document.createElement('div');
      var child = document.createElement('span');
      context.appendChild(child);

      expect(DOM.require('span', context)).to.equal(child);
    });

    it('throws when the element is not found', function() {
      expect(function() {
        DOM.require('garbage');
      }).to.throw(/element not found by selector.*garbage.*/);
    });
  });

  describe('clone', function() {
    var returnValue, domElemement;

    beforeEach(function() {
      domElemement = createADOMElement();
    });

    it('returns a detached clone of the given DOM element', function() {
      returnValue = DOM.clone(domElemement);
      expect(domElemement.outerHTML).to.equal(returnValue.outerHTML);
      expect(domElemement).not.to.equal(returnValue);
    });

    function createADOMElement() {
      var div = document.createElement('div');
      div.textContent = 'This is a DIV';

      var p = document.createElement('p');
      p.textContent = 'A paragraph';

      var a = document.createElement('a');
      a.href = 'http://some.url';

      div.appendChild(p);
      div.appendChild(a);

      return div;
    }
  });
});
