const Joi = require('joi')
const BaseRoute = require('./base/baseRoute')

const failAction = (req, headers, error) => { throw error }

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
          failAction
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

  create() {
    return {
      path: '/cards',
      method: 'POST',
      config: {
        validate: {
          failAction,
          payload: {
            name: Joi.string().required().min(3).max(100),
            types: Joi.string().required().min(4).max(20),
            attribute: Joi.string().required().min(4).max(20),
            level: Joi.number().integer().required().default(0),
            atk: Joi.number().integer().required().default(0),
            def: Joi.number().integer().required().default(0)
          }
        }
      },
      handler: async (req, headers) => {
        try {
          const { _id, name, types, attribute, level, atk, def } = req.payload
          const res = await this._db.create({ name, types, attribute, level, atk, def })
          return {
            _id,
            message: "The card was created with success :)"
          }
        } catch (error) {
          console.log('Internal Error!', error)
          return 'Internal Error!'
        }
      }
    }
  }
}
module.exports = CardRoutes