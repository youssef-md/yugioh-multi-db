const iCrud = require('./interfaces/interfaceCrud')
const Mongoose = require('mongoose')
const { MONGODB_USERNAME, MONGODB_PASSWORD } = require('../../dbLogin')
const connectionAddress = `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@localhost:27017/yugioh`

const STATUS = { 0: 'Disconnected', 1: 'Connected', 2: 'Connecting', 3: 'Disconnecting' }

class MongoDB extends iCrud {
  constructor() {
    super()
    this._connection = null
    this._YuGiOh = null
  }

  async isConnected() {
    const state = STATUS[this._connection.readyState]
    if (state !== 'Connecting') return state
    await new Promise(resolve => setTimeout(resolve, 1000)) // blocking line with an await for a setTimeout
    return STATUS[this._connection.readyState] // check again if is connected
  }

  async connect() {
    Mongoose.connect(connectionAddress, { useNewUrlParser: true }, function (error) {
      if (!error) return
      console.log('Connection to MongoDB Failed!', error)
    })
    this._connection = Mongoose.connection
    this._connection.once('open', () => console.log('Mongodb Database running'))
  }

  async defineMondel() {
    const cardSchema = new Mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
      atk: {
        type: String,
        required: true,
      },
    })

    this._YuGiOh = Mongoose.model('CARD', cardSchema)
  }


  create(item) { console.log(`Creating the item ${item.name} in MongoDB...`) }
  read(query) { console.log(`Reading the query ${query} in MongoDB...`) }
  update(id, item) { console.log(`Updating the item with id ${id} in MongoDB...`) }
  delete(id) { console.log(`Deleting the item with id ${id} in MongoDB...`) }
}

module.exports = MongoDB