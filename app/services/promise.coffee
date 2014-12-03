Q = require('q')

Promise = (f) -> Q.Promise(f)
Promise.resolve = Q.resolve
Promise.reject = Q.reject

module.exports = Promise
