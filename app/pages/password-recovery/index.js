'use strict';

var PasswordRecoveryPage = require('./password-recovery-page');
var UserData = require('app/services/user-data');

new PasswordRecoveryPage(document.body, new UserData());
