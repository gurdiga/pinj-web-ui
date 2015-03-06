'use strict';

var ClientListPage = require('./client-list-page');
var UserData = require('app/services/user-data');
var config = require('app/config');

new ClientListPage(document.body, new UserData(config.FIREBASE_URL));
