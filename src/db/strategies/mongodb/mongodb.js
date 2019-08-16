const iCrud = require('../interfaces/interfaceCrud')
const Mongoose = require('mongoose')

const connectionAddress = process.env.MONGODB_URL
const STATUS = { 0: 'Disconnected', 1: 'Connected', 2: 'Connecting', 3: 'Disconnecting' }

class MongoDB extends iCrud {
  constructor(connection, schema) {
    super()
    this._connection = connection
    this._schema = schema
  }

  async isConnected() {
    const state = STATUS[this._connection.readyState]
    if (state !== 'Connecting') return state
    await new Promise(resolve => setTimeout(resolve, 1000)) // blocking line with an await for a setTimeout
    return STATUS[this._connection.readyState] // check again if is connected
  }

  static connect() {
    Mongoose.connect(connectionAddress, { useNewUrlParser: true }, error => {
      if (!error) return
      console.log('Connection with MongoDB Failed!', error)
    })

    const connection = Mongoose.connection
    connection.once('open', () => console.log('Mongodb is running...'))
    return connection
  }

  async create(item) {
    console.log(`Creating the item ${item.name} in MongoDB...`)
    return await this._schema.create(item)
  }

  read(query, skip = 0, limit = 0) { // with pagination
    console.log(`Reading the query ${query} in MongoDB...`)
    return this._schema.find(query).skip(skip).limit(limit)
  }

  update(id, item) {
    console.log(`Updating the item with id ${id} in MongoDB...`)
    return this._schema.updateOne({ _id: id }, { $set: item })
  }

  delete(id) {
    console.log(`Deleting the item with id ${id} in MongoDB...`)
    return this._schema.deleteOne({ _id: id })
  }
}

module.exports = MongoDB