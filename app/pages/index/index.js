'use strict';

var IndexPage = require('./index-page');
var UserData = require('app/services/user-data');
var config = require('app/config');

new IndexPage(document.body, new UserData(config.FIREBASE_URL));
