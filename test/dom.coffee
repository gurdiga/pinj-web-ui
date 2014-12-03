DOM = require '../src/services/dom.coffee'

describe 'DOM', ->
  describe 'require', ->
    returnValue = undefined

    it 'delegates to document.querySelector', ->
      returnValue = { 'the': 'dom object' }
      @sinon.stub(document, 'querySelector').returns(returnValue)

      expect(DOM.require('#selector'), 'return value').to.equal returnValue
      expect(document.querySelector).to.have.been.calledWith '#selector'

    it 'accepts a context element as the second argument', ->
      context = document.createElement('div')
      child = document.createElement('span')
      context.appendChild child

      expect(DOM.require('span', context)).to.equal child

    it 'throws when the element is not found', ->
      expect(-> DOM.require 'garbage').to.throw /element not found by selector.*garbage.*/

  describe 'clone', ->
    returnValue = undefined
    domElemement = undefined

    beforeEach ->
      domElemement = createADOMElement()

    it 'returns a detached clone of the given DOM element', ->
      returnValue = DOM.clone(domElemement)
      expect(domElemement.outerHTML).to.equal returnValue.outerHTML
      expect(domElemement).not.to.equal returnValue

    createADOMElement = ->
      div = document.createElement('div')
      div.textContent = 'This is a DIV'

      p = document.createElement('p')
      p.textContent = 'A paragraph'

      a = document.createElement('a')
      a.href = 'http://some.url'

      div.appendChild p
      div.appendChild a
      div
