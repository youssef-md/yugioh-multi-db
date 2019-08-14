const { INTEGER, STRING } = require('sequelize')

const yugiohSchema = {
  name: 'USERS',
  schema: {
    id: { type: INTEGER, required: true, primaryKey: true, autoIncrement: true },
    username: { type: STRING, required: true, unique: true },
    password: { type: STRING, required: true, unique: true },
  },
  options: {
    tableName: 'USERS',
    freezeTableName: false,
    timestamps: false
  }
}

module.exports = yugiohSchema