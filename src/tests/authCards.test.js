const { deepEqual, ok } = require('assert')
const api = require('../api')

const Context = require('../db/strategies/base/contextStrategy')
const Postgres = require('../db/strategies/postgres/postgres')
const userSchema = require('../db/strategies/postgres/schemas/userSchema')

const USER = {
  username: 'YoussefMuhamad',
  password: '123'
}

const USER_DB = {
  username: USER.username.toLowerCase(),
  password: '$2b$04$l4R4BBDciRbVjSWIudUPre9Qiy6O.SdGjvT/A.oTNwLSkGfBDb5sy'
}

let app = {}
describe('Auth test suite', function () {
  this.beforeAll(async () => {
    app = await api

    const connectionPostgres = await Postgres.connect()
    const model = await Postgres.defineModel(connectionPostgres, userSchema)
    const postgres = new Context(new Postgres(connectionPostgres, model))
    await postgres.update(null, USER_DB, true) // if USER_DB is not there, create it with upsert
  })

  it('Should obtain a token', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/login',
      payload: USER
    })

    const statusCode = res.statusCode
    const data = JSON.parse(res.payload)

    deepEqual(statusCode, 200)
    ok(data.token.length > 10)
  })
})