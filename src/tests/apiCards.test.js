const { deepEqual, ok } = require('assert')
const api = require('../api')
let app = {}

describe('API Cards', function () {
  this.beforeAll(async () => {
    app = await api
  })

  it('Should list all cards in /cards', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/cards'
    })
    const statusCode = res.statusCode
    const data = JSON.parse(res.payload)

    deepEqual(statusCode, 200)
    ok(Array.isArray(data))
  })
})