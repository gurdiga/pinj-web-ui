'use strict';

module.exports = function(context, requiredMembers) {
  Object.keys(requiredMembers).forEach(function(name) {
    if (!context[name]) {
      var errorMessage = context.constructor.name + ' must define ' + name + ' ' + requiredMembers[name] + ' before calling super';
      throw new Error(errorMessage);
    }
  });
};
