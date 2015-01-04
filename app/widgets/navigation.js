'use strict';

function Navigation() {
}

Navigation.PAGES = [
  'IndexPage',
  'RegistrationPage',
  'ClientListPage',
  'PasswordRecoveryPage'
];

Navigation.getPathForPage = function(className) {
  verifyClassName(className);

  return '/' + className
    .replace(/Page$/, '.html')
    .replace(/[A-Z]/g, function(match, offset) {
      return (offset > 0 ? '-' : '') + match.toLowerCase();
    });

  function verifyClassName(className) {
    if (Navigation.PAGES.indexOf(className) === -1) {
      throw new Error('Unknown page class “' + className + '”. It must be one of: “' + Navigation.PAGES.join('”, “') + '”.');
    }
  }
};

module.exports = Navigation;
