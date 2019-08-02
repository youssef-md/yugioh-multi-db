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

  it('should list only a limited number of typles, by pagination', async () => {
    const LIMIT = 3
    const res = await app.inject({
      method: 'GET',
      url: `/cards?skip=0&limit=${LIMIT}`
    })

    const statusCode = res.statusCode
    const data = JSON.parse(res.payload)
    console.log(data.length)
    deepEqual(statusCode, 200)
    ok(data.length === LIMIT)
  })

})