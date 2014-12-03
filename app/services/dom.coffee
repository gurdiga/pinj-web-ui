DOM =
  require: (selector, context) ->
    context ?= document
    element = context.querySelector(selector)
    throw new Error("DOM.require: element not found by selector: “#{selector}”") if not element
    element

  clone: (element) ->
    container = document.createElement('div')
    container.innerHTML = element.outerHTML
    container.removeChild container.firstChild

module.exports = DOM
