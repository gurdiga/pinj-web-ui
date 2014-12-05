Promise = require 'app/services/promise.coffee'

describe 'Promise', ->
  it 'can resolve and then', (done) ->
    value = 42
    new Promise (resolve, reject) -> resolve value
    .then (resolvedValue) ->
      expect(resolvedValue).to.equal value
      done()
    .catch done

  it 'can reject and catch', (done) ->
    error = new Error 'Something bad happened'
    new Promise (resolve, reject) -> reject error
    .catch (rejectedError) ->
      expect(rejectedError).to.equal error
      done()
    .catch done
