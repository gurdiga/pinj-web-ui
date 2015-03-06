'use strict';

var PasswordRecoveryPage = require('./password-recovery-page');
var UserData = require('app/services/user-data');
var config = require('app/config');

new PasswordRecoveryPage(document.body, new UserData(config.FIREBASE_URL));
