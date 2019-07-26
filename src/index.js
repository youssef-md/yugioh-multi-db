const ContextStrategy = require('./db/strategies/base/contextStrategy')
const MongoDB = require('./db/strategies/mongodb')
const Postgres = require('./db/strategies/postgres')

const card = { id: 1, name: 'Dark Magician', atk: 2500, def: 2300, type: 'fiend' }

const contextMongo = new ContextStrategy(new MongoDB())
contextMongo.create(card)
contextMongo.read('select *')
contextMongo.update(card.id, { name: 'Kuriboh' })
contextMongo.delete(card.id)

const contextPostgres = new ContextStrategy(new Postgres())
contextPostgres.create(card)
contextPostgres.read('select *')
contextPostgres.update(card.id, { name: 'Kuriboh' })
contextPostgres.delete(card.id)