const Sequelize = require('sequelize')
const iCrud = require('./interfaces/interfaceCrud')
const Card = require('../models/CardPostgres')
const { POSTGRES_USERNAME, POSTGRES_PASSWORD } = require('../../dbLogin')

class Postgres extends iCrud {
  constructor() {
    super()
    this._driver = null
    this._YuGiOh = null
  }

  async connect() {
    this._driver = new Sequelize(
      'yugioh',
      POSTGRES_USERNAME,
      POSTGRES_PASSWORD,
      { host: 'localhost', dialect: 'postgres', quoteIdentifiers: false, operatorAliases: false }
    )

    await this.defineModel()
  }

  async isConnected() {
    try {
      await this._driver.authenticate()
      return true
    } catch (error) {
      console.log('Connection Failed!', error)
      return
    }
  }

  async defineModel() {
    this._YuGiOh = this._driver.define('CARD', Card, {
      tableName: 'CARD',
      freezeTableName: false,
      timestamps: false
    })

    await this._YuGiOh.sync()
  }

  create(item) { console.log(`Creating the item ${item.name} in PostgreSQL...`) }
  read(query) { console.log(`Reading the query ${query} in PostgreSQL...`) }
  update(id, item) { console.log(`Updating the item with id ${id} in PostgreSQL...`) }
  delete(id) { console.log(`Deleting the item with id ${id} in PostgreSQL...`) }
}

module.exports = Postgres