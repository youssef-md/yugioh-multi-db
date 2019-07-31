const { deepEqual } = require('assert')

const Context = require('../db/strategies/base/contextStrategy')
const Mongodb = require('../db/strategies/mongodb/mongodb')
const yugiohSchema = require('../db/strategies/mongodb/schemas/yugiohSchema')

const { MOCK_CARD_CREATE, MOCK_CARD_UPDATE } = require('./mocks')
let { MOCK_CARD_ID } = require('./mocks')

describe('MongoDB Strategy', async function () {
  this.timeout(Infinity)
  let context = null

  this.beforeAll(async () => {
    const connection = Mongodb.connect()
    context = new Context(new Mongodb(connection, yugiohSchema))

    const res = await context.create(MOCK_CARD_UPDATE)
    MOCK_CARD_ID = res._id
  })

  it('Should try connection', async () => {
    const res = await context.isConnected()
    console.log(res);
    const expected = 'Connected'
    deepEqual(res, expected)
  })

  it('Should create a card', async () => {
    const { name, atk, def } = await context.create(MOCK_CARD_CREATE)
    deepEqual({ name, atk, def }, { name: MOCK_CARD_CREATE.name, atk: MOCK_CARD_CREATE.atk, def: MOCK_CARD_CREATE.def })
  })

  it('Should read a card', async () => {
    const [{ name, atk, def }] = await context.read({ name: MOCK_CARD_CREATE.name }, 0, 2)
    deepEqual({ name, atk, def }, { name: MOCK_CARD_CREATE.name, atk: MOCK_CARD_CREATE.atk, def: MOCK_CARD_CREATE.def })
  })

  it('Should update a card', async () => {
    const res = await context.update(MOCK_CARD_ID, { name: 'The Winged Dragon of Ra' })
    deepEqual(res.nModified, 1)
  })

  it('Should delete a card', async () => {
    const res = await context.delete(MOCK_CARD_ID)
    deepEqual(res.n, 1)
  })
})