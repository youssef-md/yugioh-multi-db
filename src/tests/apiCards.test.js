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
    deepEqual(statusCode, 200)
    ok(data.length === LIMIT)
  })

  it('Should filter by name and limit by 2', async () => {
    const NAME = 'Obelisk The Tormentor'
    const res = await app.inject({
      method: 'GET',
      url: `/cards?skip=0&limit=2&name=${NAME}`
    })

    const statusCode = res.statusCode
    const data = JSON.parse(res.payload)
    deepEqual(statusCode, 200)
    deepEqual(data[0].name, NAME)
    deepEqual(data[1].name, NAME)
  })

  it('Should filter just by a word in the name', async () => {
    const NAME = 'The'
    const res = await app.inject({
      method: 'GET',
      url: `/cards?name=${NAME}`
    })

    const statusCode = res.statusCode
    const data = JSON.parse(res.payload)
    ok(data[0].name, NAME)
  })
})