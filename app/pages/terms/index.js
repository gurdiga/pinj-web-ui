'use strict';

var TermsPage = require('./terms-page');
var UserData = require('app/services/user-data');
var config = require('app/config');

new TermsPage(document.body, new UserData(config.FIREBASE_URL));
