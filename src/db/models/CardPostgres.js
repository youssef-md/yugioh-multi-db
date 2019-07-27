const { INTEGER, STRING } = require('sequelize')

const Card = {
  id: { type: INTEGER, required: true, primaryKey: true, autoIncrement: true },
  name: { type: STRING, required: true },
  types: { type: STRING, require: true },
  attribute: { type: STRING, require: true },
  level: { type: INTEGER, require: true },
  atk: { type: STRING, require: true },
  def: { type: STRING, require: true },
}

module.exports = Card