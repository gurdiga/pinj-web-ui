window.Firebase = require('firebase');
window.Q = require('q');

require('./services/dom.js');
require('./services/promise.js');
require('./services/user-data.js');
require('./pages/index/authentication-form-validator.js');
require('./pages/index/authentication-form.js');
require('./pages/index/index-page.js');
require('./pages/client-list/client-list-form.js');
require('./pages/client-list/client-list-page.js');
require('./pages/client-list/client-list.js');
require('./pages/password-recovery/password-recovery-form-validator.js');
require('./pages/password-recovery/password-recovery-form.js');
require('./pages/password-recovery/password-recovery-page.js');
require('./pages/registration/registration-form-validator.js');
require('./pages/registration/registration-form.js');
require('./pages/registration/registration-page.js');
require('./widgets/navigation.js');
