const { deepEqual } = require('assert')
const Postgres = require('../db/strategies/postgres')
const Context = require('../db/strategies/base/contextStrategy')

const context = new Context(new Postgres())

const MOCK_CARD_CREATE = { name: 'Obelisk The Tormentor', types: 'MONSTER', attribute: 'DIVINE', level: 10, atk: '4000', def: '4000' }
const MOCK_CARD_UPDATE = { name: 'Bakura', types: 'DIVINE-BEAST/EFFECT', attribute: 'DIVINE', level: 10, atk: '?', def: '?' }

describe('Postgres Strategy', function () {
  this.beforeAll(async () => {
    await context.connect()
    await context.create(MOCK_CARD_UPDATE)
  })

  it('PostgreSQL Connection', async () => {
    const res = await context.isConnected()
    deepEqual(res, true)
  })

  it('Should create a card', async () => {
    const res = await context.create(MOCK_CARD_CREATE)
    delete res.id
    deepEqual(res, MOCK_CARD_CREATE)
  })

  it('Should read a card given its name', async () => {
    const [res] = await context.read({ name: MOCK_CARD_CREATE.name })
    delete res.id
    deepEqual(res, MOCK_CARD_CREATE)
  })

  it('Should update a card', async () => {
    const [prevCard] = await context.read({ name: MOCK_CARD_UPDATE.name })
    const updates = {
      ...MOCK_CARD_UPDATE,
      name: 'The Winged Dragon of Ra'
    }
    const [statusUpdate] = await context.update(prevCard.id, updates)
    deepEqual(statusUpdate, 1)
    const [updatedCard] = await context.read({ id: prevCard.id })
    deepEqual(updatedCard.name, updates.name)
  })
})