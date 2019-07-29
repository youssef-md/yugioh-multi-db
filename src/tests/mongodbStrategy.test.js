const { deepEqual } = require('assert')
const Mongodb = require('../db/strategies/mongodb')
const Context = require('../db/strategies/base/contextStrategy')

const context = new Context(new Mongodb())

const MOCK_CARD_CREATE = { name: 'Obelisk The Tormentor', types: 'MONSTER', attribute: 'DIVINE', level: 10, atk: '4000', def: '4000' }
const MOCK_CARD_UPDATE = { name: 'Bakura', types: 'DIVINE-BEAST/EFFECT', attribute: 'DIVINE', level: 10, atk: '?', def: '?' }

describe('Suite for MongoDB', async function () {
  this.timeout(Infinity)
  this.beforeAll(async () => {
    await context.connect()
  })

  it('Should try connection', async () => {
    const res = await context.isConnected()
    console.log(res);
    const expected = 'Connected'
    deepEqual(res, expected)
  })
})