'use strict';

describe.skip('Tooltip', function() {
  var tooltip, domElement;

  beforeEach(function() {
    domElement = prepareDOMElement();
    domElement.textContent = '';
    tooltip = new Tooltip(domElement);
  });

  it('can show some text', function() {
    var text = 'Some information';

    expect(domElement.classList.contains('hidden'), 'is initially hidden').to.be.true;
    tooltip.show(text);

    expect(domElement.classList.contains('hidden'), 'is displayed').to.be.false;
    expect(domElement.textContent).to.equal(text);
  });

  it('can be hidden', function() {
    expect(domElement.classList.contains('hidden'), 'is initially visible').to.be.false;
    tooltip.hide();
    expect(domElement.classList.contains('hidden'), 'is then hidden').to.be.true;
  });

  describe('close button', function() {
    var closeButton;

    beforeEach(function() {
      tooltip.show('Yes!');
      this.sinon.spy(tooltip, 'hide');
      closeButton = domElement.querySelector('button.close');
    });

    it('is injected', function() {
      expect(closeButton).to.exist;
    });

    it('hides the tooltip', function() {
      closeButton.click();
      expect(tooltip.hide).to.have.been.called;
    });
  });

  function prepareDOMElement() {
    var div = document.createElement('div');
    return div;
  }
});

var Tooltip = require('app/widgets/tooltip');
