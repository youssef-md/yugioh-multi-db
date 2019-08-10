const Joi = require('joi')
const Boom = require('boom')
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
        tags: ['api'],
        description: 'List cards',
        notes: 'You can paginate and filter the results',
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
          return Boom.internal()
        }
      }
    }
  }

  create() {
    return {
      path: '/cards',
      method: 'POST',
      config: {
        tags: ['api'],
        description: 'Create card',
        notes: 'You can create a card by passing all the values',
        validate: {
          failAction,
          payload: {
            name: Joi.string().required().min(3).max(100),
            types: Joi.string().required().min(4).max(20),
            attribute: Joi.string().required().min(4).max(20),
            level: Joi.number().integer().required().default(0),
            atk: Joi.string().required().min(1).max(9),
            def: Joi.string().required().min(1).max(9)
          }
        }
      },
      handler: async (req, headers) => {
        try {
          const { name, types, attribute, level, atk, def } = req.payload
          const { _id } = await this._db.create({ name, types, attribute, level, atk, def })
          return { _id, message: "The card was created with success :)" }

        } catch (error) {
          console.log('Internal Error!', error)
          return Boom.internal()
        }
      }
    }
  }

  update() {
    return {
      path: '/cards/{id}',
      method: 'PATCH',
      config: {
        tags: ['api'],
        description: 'Update cards',
        notes: 'You can update a card by passing its id and the values that you want to change',
        validate: {
          params: { id: Joi.string().required() },
          payload: {
            name: Joi.string().min(3).max(100),
            types: Joi.string().min(4).max(20),
            attribute: Joi.string().min(4).max(20),
            level: Joi.number().integer().default(0),
            atk: Joi.string().min(1).max(9),
            def: Joi.string().min(1).max(9)
          }
        }
      },
      handler: async (req) => {
        try {
          const { id } = req.params
          const { payload } = req
          const updateDataString = JSON.stringify(payload)
          const updateData = JSON.parse(updateDataString) // removing all undefined keys, since all the attrs are NOT required()

          const res = await this._db.update(id, updateData)
          return (res.nModified === -1)
            ? Boom.preconditionFailed('It was NOT possible to update the card :(')
            : { message: 'The card was updated with success :)' }

        } catch (error) {
          console.log('Internal Error', error)
          return Boom.internal()
        }
      }
    }
  }

  delete() {
    return {
      path: '/cards/{id}',
      method: 'DELETE',
      config: {
        tags: ['api'],
        description: 'Delete card',
        notes: 'You can delete a card by its id',
        validate: {
          failAction,
          params: { id: Joi.string().required() }
        }
      },
      handler: async (req) => {
        try {
          const { id } = req.params
          const res = await this._db.delete(id)
          return (res.n !== 1)
            ? Boom.preconditionFailed('It was not possible to remove this card :(')
            : { message: 'The card was deleted with success :)' }

        } catch (error) {
          console.log('Internal Error', error)
          return Boom.internal()
        }
      }
    }
  }
}
module.exports = CardRoutes