'use strict';

var PasswordChangePage = require('./password-change-page');
var UserData = require('app/services/user-data');

new PasswordChangePage(document.body, new UserData());
