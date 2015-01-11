'use strict';

var TermsPage = require('./terms-page');
var UserData = require('app/services/user-data');

new TermsPage(document.body, new UserData());
