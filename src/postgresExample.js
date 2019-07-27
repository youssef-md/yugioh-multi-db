const Sequelize = require('sequelize')
const { POSTGRES_USERNAME, POSTGRES_PASSWORD } = require('./dbLogin')

const driver = new Sequelize(
  'yugioh',
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  { host: 'localhost', dialect: 'postgres', quoteIdentifiers: false, operatorAliases: false }
)

main()
async function main() {
  const yugioh = driver.define('card', {
    id: { type: Sequelize.INTEGER, required: true, primaryKey: true, autoIncrement: true },
    name: { type: Sequelize.STRING, required: true },
    types: { type: Sequelize.STRING, require: true },
    attribute: { type: Sequelize.STRING, require: true },
    level: { type: Sequelize.INTEGER, require: true },
    atk: { type: Sequelize.STRING, require: true },
    def: { type: Sequelize.STRING, require: true },
  }, {
      tableName: 'CARD',
      freezeTableName: false,
      timestamps: false
    })
  await yugioh.sync()
  await yugioh.create({
    name: 'Kuriboh',
    types: 'NORMAL',
    attribute: 'LIGHT',
    level: 2,
    atk: '300',
    def: '300'
  })
  const res = await yugioh.findAll({ raw: true, attributes: ['name', 'atk', 'def'] })
  console.log(res)
}