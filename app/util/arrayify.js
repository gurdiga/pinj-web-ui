'use strict';

module.exports = arrayify;

function arrayify(list) {
  return [].slice.call(list);
}
