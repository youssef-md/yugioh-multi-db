const assert = require('assert')
const Postgres = require('../db/strategies/postgres')
const Context = require('../db/strategies/base/contextStrategy')

const context = new Context(new Postgres())

const MOCK_CARD_CREATE = { name: 'Obelisk The Tormentor', types: 'MONSTER', attribute: 'DIVINE', level: 10, atk: '4000', def: '4000' }

describe('Postgres Strategy', function () {
  this.beforeAll(async () => {
    await context.connect()
  })

  it('PostgreSQL Connection', async () => {
    const res = await context.isConnected()
    assert.equal(res, true)
  })

  it('Should create a card', async () => {
    const res = await context.create(MOCK_CARD_CREATE)
    delete res.id
    assert.deepEqual(res, MOCK_CARD_CREATE)
  })
})