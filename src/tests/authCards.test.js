const { deepEqual, ok } = require('assert')
const api = require('../api')

let app = {}

describe.only('Auth test suite', function () {
  this.beforeAll(async () => {
    app = await api
  })

  it('Should obtain a token', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/login',
      payload: {
        username: 'josedoegito',
        password: '123123'
      }
    })

    const statusCode = res.statusCode
    const data = JSON.parse(res.payload)

    deepEqual(statusCode, 200)
    ok(data.token.lentgh > 10)
  })
})