const Mongoose = require('mongoose')
const { MONGODB_USERNAME, MONGODB_PASSWORD } = require('./dbLogin')

Mongoose.connect(`mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@localhost:27017/yugioh`, { useNewUrlParser: true }, function (error) {
  if (!error) return
  console.log('Connection to MongoDB Failed!', error)
})

const connection = Mongoose.connection
connection.once('open', () => console.log('Mongodb Database running'))

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

const model = Mongoose.model('CARD', cardSchema)

main()
async function main() {
  const res = await model.create({ name: 'Youssef', atk: '10000' })
  console.log(res);

  const read = await model.find()
  console.log('Itens', read);
}