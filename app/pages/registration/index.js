'use strict';

var RegistrationPage = require('./registration-page');
var UserData = require('app/services/user-data');
var config = require('app/config');

new RegistrationPage(document.body, new UserData(config.FIREBASE_URL));
