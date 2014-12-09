Promise = require 'app/services/promise.coffee'
Firebase = require 'firebase'

class UserData
  firebaseRef = new Firebase('https://pinj-dev.firebaseio.com')

  registerUser: (email, password) =>
    new Promise (resolve, reject) =>
      firebaseRef.createUser
        email: email,
        password: password
      , (error) =>
        if not error?
          resolve()
        else
          reject getLocalizedError(error.code)

  authenticateUser: (email, password) =>
    new Promise (resolve, reject) =>
      firebaseRef.authWithPassword
        email: email,
        password: password
      , (error, session) =>
        if not error?
          @aid = email.replace(/\./g, ':')
          @set 'uid', session.uid
          .then resolve, reject
        else
          reject getLocalizedError(error.code)

  isCurrentlyAuthenticated: =>
    session = firebaseRef.getAuth()
    return false unless session?
    session.expires >= Date.now() / 1000

  getCurrentUserEmail: =>
    session = firebaseRef.getAuth()
    return 'NOT_AUTHENTICATED' unless session?
    session.password.email || 'NO_EMAIL_ON_SESSION'

  getCurrentUserId: =>
    session = firebaseRef.getAuth()
    return 'NOT_AUTHENTICATED' unless session?
    session.uid || 'NO_UID_ON_SESSION'

  sendPasswordRecoveryEmail: (email) =>
    new Promise (resolve, reject) =>
      firebaseRef.resetPassword
        email: email
      , (error) =>
        if not error?
          resolve()
        else
          reject getLocalizedError(error.code)

  unauthenticateCurrentUser: =>
    new Promise (resolve, reject) =>
      @email = undefined
      firebaseRef.unauth()
      resolve()

  unregisterUser: (email, password) =>
    new Promise (resolve, reject) =>
      firebaseRef.removeUser
        email: email
        password: password
      , (error) =>
        if not error?
          @aid = email.replace(/\./g, ':')
          @set '', null
          .then resolve, reject
        else
          reject getLocalizedError(error.code)

  set: (path, value) =>
    new Promise (resolve, reject) =>
      throw new Error('Not authenticated') unless @aid?

      firebaseRef.child("/data/#{@aid}/#{path}").set value
      , (error) =>
        if not error?
          resolve()
        else
          reject getLocalizedError(error.code)

  get: (path) =>
    new Promise (resolve, reject) =>
      firebaseRef.child("/data/#{@aid}/#{path}").once "value"
      , (snapshot) => resolve snapshot.val()
      , (error) => reject getLocalizedError(error.code)

getLocalizedError = (code) =>
  MESSAGES_BY_CODE =
    EMAIL_TAKEN: 'Această adresă de email este înregistrată deja.'
    INVALID_EMAIL: 'Adresa de email este incorectă sintactic.'
    INVALID_USER: 'Această adresă de email nu este înregistrată.'
    INVALID_PASSWORD: 'Parola este incorectă.'
    NETWORK_ERROR: 'Conexiunea la Internet este instabilă sau lipseşte.'
    PERMISSION_DENIED: 'Acces interzis.'

  FALLBACK_MESSAGE = "A intervenit o eroare neprevăzută (#{code})."

  localizedMessage = MESSAGES_BY_CODE[code] || FALLBACK_MESSAGE
  error = new Error(localizedMessage)
  error.code = code
  error

module.exports = UserData
