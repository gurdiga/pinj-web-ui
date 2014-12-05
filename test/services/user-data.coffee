UserData = require 'app/services/user-data.coffee'

describe.integration 'UserData', ->
  @timeout 10000

  email = 'user-data@test.com'
  password = 'P4ssw0rd!'
  userData = undefined

  before ->
    userData = new UserData

  it 'can register a user', (done) ->
    userData.registerUser email, password
    .then done, done

  it 'can authenticate the registered user', (done) ->
    userData.authenticateUser email, password
    .then ->
      expect(userData.isCurrentlyAuthenticated()).to.be.true
      expect(userData.getCurrentUserEmail()).to.equal email
      expect(userData.getCurrentUserId()).to.exist
      done()
    .catch done

  it 'can get some saved piece of data', (done) ->
    path = 'some/path'
    value = 'yes'

    userData.set path, value
    .then ->
      userData.get(path)
    .then (returnedValue) ->
      expect(returnedValue).to.equal(value)
      done()
    .catch done

  it 'can unregister the registered user', (done) ->
    userData.unregisterUser email, password
    .then done, done

  it 'can unauthenticate the registered user', (done) ->
    userData.unauthenticateCurrentUser()
    .then ->
      expect(userData.isCurrentlyAuthenticated()).to.be.false
      expect(userData.getCurrentUserEmail()).to.equal 'NOT_AUTHENTICATED'
      expect(userData.getCurrentUserId()).to.equal 'NOT_AUTHENTICATED'
      done()
    .catch done

  after (done) ->
    userData.unregisterUser email, password
    .then ->
      expect(it, 'User should have been unregistered').not.to.be.false
    .catch (error) ->
      expect(error.message).to.equal 'Această adresă de email nu este înregistrată.'
    .finally done
