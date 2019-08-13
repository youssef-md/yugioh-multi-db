const { deepEqual, ok } = require('assert')
const { MOCK_CARD_CREATE, MOCK_CARD_UPDATE } = require('./mocks')
const api = require('../api')
let app = {}
let MOCK_ID = null

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IllPdXNzZWZNdWhhbWFkIiwiaWQiOjEsImlhdCI6MTU2NTY2NTM2NH0.kfYNb8FzQ_QUleI4-nn63ewPIydcXOdhpu8h4_YdVjw'
const headers = {
  Authorization: TOKEN
}
describe('API Cards', function () {
  this.beforeAll(async () => {
    app = await api
    await app.inject({ method: 'POST', url: '/cards', payload: JSON.stringify(MOCK_CARD_CREATE), headers })
    const res = await app.inject({ method: 'POST', url: '/cards', payload: JSON.stringify(MOCK_CARD_UPDATE), headers })
    const data = JSON.parse(res.payload)
    MOCK_ID = data._id
  })

  it('Should list all cards in /cards', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/cards',
      headers
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
      url: `/cards?skip=0&limit=${LIMIT}`,
      headers
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
      url: `/cards?skip=0&limit=2&name=${NAME}`,
      headers
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
      url: `/cards?name=${NAME}`,
      headers
    })

    const statusCode = res.statusCode
    const data = JSON.parse(res.payload)
    ok(data[0].name, NAME)
  })

  it('Should create a card POST /cards', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/cards',
      payload: MOCK_CARD_CREATE,
      headers
    })

    const statusCode = res.statusCode
    const { message } = JSON.parse(res.payload)
    ok(statusCode === 200)
    deepEqual(message, "The card was created with success :)")
  })

  it('Should update a card PATCH - /cards/:id', async () => {
    const expected = { atk: '2000', def: '1200' }
    const res = await app.inject({
      method: 'PATCH',
      url: `/cards/${MOCK_ID}`,
      payload: JSON.stringify(expected),
      headers
    })

    const statusCode = res.statusCode
    const data = JSON.parse(res.payload)
    ok(statusCode === 200)
    deepEqual(data.message, 'The card was updated with success :)')
  })

  it('Should delete a card DELETE - /cards/:id', async () => {
    const _id = MOCK_ID
    const res = await app.inject({
      method: 'DELETE',
      url: `/cards/${_id}`,
      headers
    })

    const statusCode = res.statusCode
    const data = JSON.parse(res.payload)

    ok(statusCode === 200)
    deepEqual(data.message, 'The card was deleted with success :)')
  })
})