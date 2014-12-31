'use strict';

var RegistrationPage = require('./registration-page');
var UserData = require('app/services/user-data');

new RegistrationPage(document.body, new UserData());
