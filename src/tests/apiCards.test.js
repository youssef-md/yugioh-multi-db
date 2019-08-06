const { deepEqual, ok } = require('assert')
const { MOCK_CARD_CREATE, MOCK_CARD_UPDATE } = require('./mocks')
const api = require('../api')
let app = {}
let MOCK_ID = null

describe.only('API Cards', function () {
  this.beforeAll(async () => {
    app = await api
    const res = await app.inject({ method: 'POST', url: '/cards', payload: JSON.stringify(MOCK_CARD_UPDATE) })
    const data = JSON.parse(res.payload)
    MOCK_ID = data._id
    console.log(MOCK_ID);
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

  it('should list only a limited number of typles, by pagination GET /cards?...', async () => {
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

  it('Should read by name and limit by 2 GET /cards?...', async () => {
    const NAME = 'Obelisk The Tormentor'
    const res = await app.inject({
      method: 'GET',
      url: `/cards?skip=0&limit=2&name=${NAME}`
    })

    const statusCode = res.statusCode
    const data = JSON.parse(res.payload)
    ok(statusCode === 200)
    deepEqual(data[0].name, NAME)
    deepEqual(data[1].name, NAME)
  })

  it('Should read a card just by a word in the name GET /cards?name...', async () => {
    const NAME = 'The'
    const res = await app.inject({
      method: 'GET',
      url: `/cards?name=${NAME}`
    })

    const statusCode = res.statusCode
    const data = JSON.parse(res.payload)
    ok(data[0].name, NAME)
  })

  it('Should create a card POST /cards', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/cards',
      payload: MOCK_CARD_CREATE
    })

    const statusCode = res.statusCode
    const { message } = JSON.parse(res.payload)
    ok(statusCode === 200)
    deepEqual(message, "The card was created with success :)")
  })

  it('Should update a card PATCH - /cards/:id', async () => {
    const _id = MOCK_ID
    const expected = { atk: 2000, def: 1200 }
    const res = await app.inject({
      method: 'PATCH',
      url: `/cards/${_id}`,
      payload: JSON.stringify(expected)
    })
    const statusCode = res.statusCode
    const data = JSON.parse(res.payload)
    ok(statusCode === 200)
    deepEqual(data.message, 'The card was updated with success: )')

  })
})