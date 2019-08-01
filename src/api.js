const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const Mongodb = require('./db/strategies/mongodb/mongodb')
const yugiohSchema = require('./db/strategies/mongodb/schemas/yugiohSchema')

const app = new Hapi.Server({
  port: 5000
})

async function main() {

  const connection = Mongodb.connect()
  const context = new Context(new Mongodb(connection, yugiohSchema))

  app.route([
    {
      path: '/cards',
      method: 'GET',
      handler: (req, head) => {
        return context.read()
      }
    }
  ])

  await app.start()
  console.log('Server is running at', app.info.port)

  return app
}

module.exports = main()