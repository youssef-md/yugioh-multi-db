const Joi = require('joi')
const BaseRoute = require('./base/baseRoute')

class CardRoutes extends BaseRoute {
  constructor(db) {
    super()
    this._db = db
  }

  list() {
    return {
      path: '/cards',
      method: 'GET',
      config: {
        validate: {
          // payload -> body
          // headers -> head
          // params -> na URL :id
          // query -> ?skip=10
          query: {
            skip: Joi.number().integer().default(0),
            limit: Joi.number().integer().default(10),
            name: Joi.string().min(3).max(100)
          },
          failAction: (req, headers, error) => { throw error }
        }
      },
      handler: (req, headers) => {
        try {
          const { skip, limit, name } = req.query
          let query = name ? { name: { $regex: `.*${name}*.` } } : {}

          return this._db.read(query, skip, limit) // Hapi resolves promises
        } catch (error) {
          console.log('Internal error', error)
          return "Internal error in the server"
        }
      }
    }
  }

  read() {

  }
}
module.exports = CardRoutes