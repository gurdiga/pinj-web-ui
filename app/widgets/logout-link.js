'use strict';

function LogoutLink(domElement, userData) {
  domElement.addEventListener('click', logoutAndNavigate);

  function logoutAndNavigate(event) {
    event.preventDefault();

    userData.unauthenticateCurrentUser()
    .then(navigateLink)
    .catch(logError);
  }

  function navigateLink() {
    domElement.removeEventListener('click', logoutAndNavigate);
    domElement.click();
  }

  function logError(error) {
    console.error(error);
  }
}

module.exports = LogoutLink;
