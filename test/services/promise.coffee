Promise = require '../../app/services/promise'

describe 'Promise', ->
  it 'can resolve and then', (done) ->
    value = 42
    p = new Promise (resolve, reject) -> resolve value
    p.then (resolvedValue) ->
      expect(resolvedValue).to.equal value

  it 'can reject and catch', (done) ->
    error = new Error 'Something bad happened'
    p = new Promise (resolve, reject) -> reject error
    p.catch (rejectedError) ->
      expect(rejectedError).to.equal error
