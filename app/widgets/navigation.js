'use strict';

function Navigation(domElement, userData) {
  if (userData.isCurrentlyAuthenticated()) showPrivateLinks();

  function showPrivateLinks() {
    var links = [].slice.call(domElement.querySelectorAll('a'));

    links.forEach(function(link) {
      link.classList.remove('private');
    });
  }
}

Navigation.PAGES = {
  'IndexPage': 'Home',
  'RegistrationPage': 'Înregistrare',
  'ClientListPage': 'Lista de clienţi',
  'PasswordChangePage': 'Schimbarea parolei',
  'PasswordRecoveryPage': 'Recuperarea parolei'
};

Navigation.getPathForPage = function(className) {
  verifyClassName(className);

  return '/' + className
    .replace(/Page$/, '.html')
    .replace(/[A-Z]/g, function(match, offset) {
      return (offset > 0 ? '-' : '') + match.toLowerCase();
    });
};

Navigation.getTitleForPage = function(className) {
  verifyClassName(className);
  return Navigation.PAGES[className];
};

function verifyClassName(className) {
  if (className in Navigation.PAGES) return;

  var knownPages = '“' + Object.keys(Navigation.PAGES).join('”, “') + '”';
  throw new Error('Unknown page class “' + className + '”. It must be one of: ' + knownPages + '.');
}

module.exports = Navigation;
