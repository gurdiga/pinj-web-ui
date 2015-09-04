'use strict';

var FormValidator = require('app/super/form-validator');
var inherits = require('inherits');

inherits(ClientListFormValidator, FormValidator);

var VALID_CHARS = /^[-0-9a-zа-яăîşţâ\. \\n#]*$/i;
var MIN_LENGTH = 4;
var MAX_ITEMS = 50;

function ClientListFormValidator() {
  FormValidator.call(this);

  this.getRequirements = function() {
    return [{
      'message': 'Este recomandat să folosiţi doar cifre, caractere româneşti şi ruse, şi “-”.',
      'fulfilled': function(data) {
        return checkItems(data, function(item) {
          return VALID_CHARS.test(item);
        });
      }
    }, {
      'message': 'Nume, denumire sau număr de dosar prea scurt: trebuie cel puţin ' + MIN_LENGTH + ' caractere.',
      'fulfilled': function(data) {
        return checkItems(data, function(item) {
          return item.length >= MIN_LENGTH;
        });
      }
    }, {
      'message': '“#” poate fi doar la început de linie pentru a desemna un număr de dosar.',
      'fulfilled': function(data) {
        return checkItems(data, function(item) {
          var hashPosition = item.indexOf('#');
          var hasHash = hashPosition > -1;
          var beginsWithHash = hashPosition === 0;

          return !hasHash || beginsWithHash;
        });
      }
    }, {
      'message': 'Numerele de dosar nu ar trebui să conţină spaţii.',
      'fulfilled': function(data) {
        return checkItems(data, function(item) {
          var hasHash = item.indexOf('#') > -1;
          var hasSpaces = item.indexOf(' ') > -1;
          return !(hasHash && hasSpaces);
        });
      }
    }, {
      'message': 'În cadrul la denumiri, nu trebuie să fie spaţii lîngă “-”.',
      'fulfilled': function(data) {
        return checkItems(data, function(item) {
          var hasSpacedDash = item.indexOf(' - ') > -1;
          return !hasSpacedDash;
        });
      }
    }, {
      'message': 'Puteţi avea maximum ' + MAX_ITEMS +' de itemi în listă.',
      'fulfilled': function(data) {
        return items(data).length <= MAX_ITEMS;
      }
    }];
  };
}

function checkItems(data, f) {
  return items(data).every(f);
}

function items(data) {
  return data['client-list']
    .split('\n')
    .filter(nonEmpty)
    .map(normalizeSpace);
}

function nonEmpty(item) {
  return item.trim().length > 0;
}

function normalizeSpace(item) {
  return item.replace(/\s+/g, ' ').trim();
}

module.exports = ClientListFormValidator;
