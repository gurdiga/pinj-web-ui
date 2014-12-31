'use strict';

var IndexPage = require('./index-page');
var UserData = require('app/services/user-data');

new IndexPage(document.body, new UserData());
