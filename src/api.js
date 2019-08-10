const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const Mongodb = require('./db/strategies/mongodb/mongodb')
const HapiSwagger = require('hapi-swagger')
const Vision = require('vision')
const Inert = require('inert')

const yugiohSchema = require('./db/strategies/mongodb/schemas/yugiohSchema')
const CardRoutes = require('./routes/cardRoutes')

const app = new Hapi.Server({
  port: 5000
})

function mapRoutes(instance, methods) {
  // ['list', 'create', 'update', 'delete']
  return methods.map(method => instance[method]()) // creating route dynamically new Route().method()
}

async function main() {

  const connection = Mongodb.connect()
  const context = new Context(new Mongodb(connection, yugiohSchema))

  const swaggerOptions = {
    info: {
      title: 'API Cards',
      version: 'v1.0',
    }
  }
  await app.register([
    Vision, Inert,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ])

  // needs destructuring to break the nested array of the returns from the methods -> [list(), create(), read(), update()]
  app.route(mapRoutes(new CardRoutes(context), CardRoutes.methods()))

  await app.start()
  console.log('Server is running at', app.info.port)

  return app
}

module.exports = main()