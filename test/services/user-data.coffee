UserData = require 'app/services/user-data.coffee'

describe 'UserData', ->
  email = 'user-data@test.com'
  password = 'P4ssw0rd!'

  it 'can register a user', (done) ->
    userData = new UserData
    userData.registerUser email, password
    .then done
    ###
    .then ->
      userData.authenticateUser email, password
    .then ->
      expect(userData.isCurrentlyAuthenticated()).to.be.true
      expect(userData.getCurrentUserEmail()).to.equal email
      expect(userData.getCurrentUserId()).to.exist
    .then ->
      # how can I test userData.sendPasswordRecoveryEmail(email)
      # without gettig to intimate with its implementation?
      return
    .then ->
      userData.unauthenticateCurrentUser()
    .then ->
      expect(userData.isCurrentlyAuthenticated()).to.be.false
      expect(userData.getCurrentUserEmail()).to.equal 'NOT_AUTHENTICATED'
      expect(userData.getCurrentUserId()).to.equal 'NOT_AUTHENTICATED'
    .then ->
      userData.unregisterUser email, password
    .then ->
      userData.authenticateUser email, password
    .catch (error) ->
      expect(error.message).to.equal 'Această adresă de email nu este înregistrată.'
    ###
