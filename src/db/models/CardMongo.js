const { Schema } = require('mongoose')

const Card = new Schema({
  name: { type: String, required: true },
  types: { type: String, require: true },
  attribute: { type: String, require: true },
  level: { type: Number, require: true },
  atk: { type: String, require: true },
  def: { type: String, require: true },
})

module.exports = Card