Promise = require 'app/services/promise.coffee'
#Firebase = require 'firebase'

class UserData
  ref = undefined
  registerUser: (email, password) ->
    new Promise (resolve, reject) ->
      resolve()


module.exports = UserData
