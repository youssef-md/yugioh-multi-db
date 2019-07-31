const { deepEqual } = require('assert')

const Context = require('../db/strategies/base/contextStrategy')
const Postgres = require('../db/strategies/postgres/postgres')
const yugiohSchema = require('../db/strategies/postgres/schemas/yugiohSchema')

const { MOCK_CARD_CREATE, MOCK_CARD_UPDATE } = require('./mocks')

describe('Postgres Strategy', function () {
  this.timeout(Infinity)
  let context = null

  this.beforeAll(async () => {
    const connection = await Postgres.connect()
    const model = await Postgres.defineModel(connection, yugiohSchema)
    context = new Context(new Postgres(connection, model))

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

  it('Should remove a card', async () => {
    const [card] = await context.read()
    const res = await context.delete(card.id)
    deepEqual(res, 1)
  })
})