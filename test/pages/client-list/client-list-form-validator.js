'use strict';

describe('ClientListFormValidator', function() {
  var validator;

  beforeEach(function() {
    validator = new ClientListFormValidator();
  });

  it('accepts an empty list', function() {
    expect(validate('')).to.be.fulfilled;
  });

  var charactersToReject = '.,;:?!%&'.split('');

  charactersToReject.forEach(function(character) {
    it('does not accept “' + character + '”', function() {
      return expect(validate('Good name\nName' + character))
      .to.be.rejectedWith(/Este recomandat să folosiţi doar/);
    });
  });

  it('rejects items shorter than 4', function() {
    return expect(validate('Bip')).to.be.rejectedWith(/prea scurt/);
  });

  it('rejects space-normalized items shorter than 4', function() {
    return expect(validate('   B   i   ')).to.be.rejectedWith(/prea scurt/);
  });

  it('ignores empty items', function() {
    return expect(validate('some-name\n\n\nother name')).to.be.fulfilled;
  });

  it('ignore space-only items', function() {
    return expect(validate('some-name\n  \n      \nother name\n     ')).to.be.fulfilled;
  });

  it('accepts short dashes', function() {
    return expect(validate('some-name')).to.be.fulfilled;
  });

  it('accepts Russian characters', function() {
    return expect(validate('Кыржалы')).to.be.fulfilled;
  });

  it('accepts Romanian characters', function() {
    return expect(validate('MărţiŞor')).to.be.fulfilled;
  });

  it('accepts # at the beginning', function() {
    return expect(validate('#238723876428734682')).to.be.fulfilled;
  });

  it('rejects # in any place else than the beginning', function() {
    return expect(validate('2387#23876428734682')).to.be.rejectedWith(/doar la început/);
  });

  it('rejects items beginning with # and containing spaces', function() {
    return expect(validate('#238723 876428734682')).to.be.rejectedWith(/Numerele de dosar nu ar trebui să conţină spaţii/);
  });

  it('rejects a dash if it has spaces around it', function() {
    return expect(validate('some - name')).to.be.rejectedWith(/În cadrul la denumiri, nu trebuie să fie spaţii lîngă “-”/);
  });

  it('accepts a list of 30 items', function() {
    var items = getRandomItems(30).join('\n');
    return expect(validate(items)).to.be.fulfilled;
  });

  it('rejects a list of more than 30 items', function() {
    var items = getRandomItems(31).join('\n');
    return expect(validate(items)).to.be.rejectedWith(/Puteţi avea maximum 30 de itemi în listă/);
  });

  function validate(clientList) {
    return validator.validate({'client-list': clientList});
  }

  function getRandomItems(count) {
    var items = [];

    for (var i = 0; i < count; i++) {
      items.push('random item ' + Date.now());
    }

    return items;
  }
});

var ClientListFormValidator = require('app/pages/client-list/client-list-form-validator');
