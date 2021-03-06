const Sequelize = require('sequelize')
const iCrud = require('../interfaces/interfaceCrud')

class Postgres extends iCrud {
  constructor(connection, schema) {
    super()
    this._connection = connection
    this._schema = schema
  }

  static async defineModel(connection, schema) {
    const model = connection.define(schema.name, schema.schema, schema.options)
    await model.sync()
    return model
  }

  static async connect() {
    const connection = new Sequelize(process.env.POSTGRES_URL, {
      operatorAliases: false,
      logging: false,
      quoteIdentifiers: false,
      ssl: process.env.SSL_DB,
      dialectOptions: {
        ssl: process.env.SSL_DB
      }
    })
    return connection
  }

  async isConnected() {
    try {
      await this._connection.authenticate()
      return true
    } catch (error) {
      console.log('Connection Failed!', error)
      return
    }
  }

  async create(item) {
    console.log(`Creating the item ${item.name} in PostgreSQL...`)
    const { dataValues } = await this._schema.create(item)
    return dataValues
  }

  async read(query = {}) {
    console.log(`Reading the query ${query} in PostgreSQL...`)
    return this._schema.findAll({ where: query, raw: true })
  }

  async update(id, item, upsert = false) {
    const fn = upsert ? 'upsert' : 'update'
    console.log(`Updating the item with id ${id} in PostgreSQL...`)
    return this._schema[fn](item, { where: { id: id } })
  }

  async delete(id) {
    console.log(`Deleting the item with id ${id} in PostgreSQL...`)
    const query = id ? { id } : {}
    return this._schema.destroy({ where: query })
  }
}

module.exports = Postgres