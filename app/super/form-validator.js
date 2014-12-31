'use strict';

var Promise = require('app/services/promise');

function FormValidator() {
  this.validate = function(data) {
    var context = this;

    return new Promise(function(resolve, reject) {
      try {
        context.getRequirements().forEach(function(requirement) {
          if (!requirement.fulfilled(data)) throw new RequirementNotMetError(requirement.message);
        });

        resolve(data);
      } catch(error) {
        reject(error);
      }
    });
  };
}

function RequirementNotMetError(message) {
  this.name = 'RequirementNotMetError';
  this.message = message;
}

RequirementNotMetError.prototype = new Error();
RequirementNotMetError.prototype.constructor = RequirementNotMetError;

module.exports = FormValidator;
