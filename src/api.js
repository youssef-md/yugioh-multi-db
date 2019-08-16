const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const Mongodb = require('./db/strategies/mongodb/mongodb')
const HapiSwagger = require('hapi-swagger')
const Vision = require('vision')
const Inert = require('inert')

const yugiohSchema = require('./db/strategies/mongodb/schemas/yugiohSchema')
const CardRoutes = require('./routes/cardRoutes')
const AuthRoutes = require('./routes/authRoutes')

const HapiJwt = require('hapi-auth-jwt2')
const JWT_SECRET = process.env.JWT_KEY

const Postgres = require('./db/strategies/postgres/postgres')
const userSchema = require('./db/strategies/postgres/schemas/userSchema')

const app = new Hapi.Server({ port: process.env.PORT })


function mapRoutes(instance, methods) {
  // ['list', 'create', 'update', 'delete']
  return methods.map(method => instance[method]()) // creating route dynamically new Route().method()
}

async function main() {

  const connection = Mongodb.connect()
  const context = new Context(new Mongodb(connection, yugiohSchema))

  const connectionPostgres = await Postgres.connect()
  const userModel = await Postgres.defineModel(connectionPostgres, userSchema)
  const contextPostgres = new Context(new Postgres(connectionPostgres, userModel))

  const swaggerOptions = { info: { title: 'API Cards', version: 'v1.0', } }

  await app.register([
    HapiJwt, Vision, Inert,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ])

  app.auth.strategy('jwt', 'jwt', {
    key: JWT_SECRET,
    // options: {
    //   expiresIn: 20
    // },
    validate: (data, req) => {
      // check if the user still active
      return { isValid: true }
    }
  })

  app.auth.default('jwt')

  app.route([ // mapping the routes with its handler methods
    ...mapRoutes(new CardRoutes(context), CardRoutes.methods()),
    ...mapRoutes(new AuthRoutes(JWT_SECRET, contextPostgres), AuthRoutes.methods())
  ])

  await app.start()
  console.log('Server is running at', app.info.port)

  return app
}

module.exports = main()