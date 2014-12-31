'use strict';

var ClientListPage = require('./client-list-page');
var UserData = require('app/services/user-data');

new ClientListPage(document.body, new UserData());
