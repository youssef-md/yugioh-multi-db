const Joi = require('joi')
const Boom = require('boom')
const BaseRoute = require('./base/baseRoute')
const jwt = require('jsonwebtoken')
const passwordHelper = require('../helpers/passwordHelper')

const failAction = (req, headers, error) => { throw error }

class AuthRoutes extends BaseRoute {

  constructor(secret, db) {
    super()
    this.secret = secret
    this.db = db
  }

  login() {
    return {
      path: '/login',
      method: 'POST',
      config: {
        auth: false,
        tags: ['api'],
        description: 'Obtain token JWT',
        notes: 'Log user in with user and password',
        validate: {
          failAction,
          payload: {
            username: Joi.string().required(),
            password: Joi.string().required(),
          }
        }
      },
      handler: async (req) => {
        const { username, password } = req.payload

        // if (username.toLowerCase() !== USER.username.toLocaleLowerCase() || password !== USER.password)
        //   return Boom.unauthorized()

        const [user] = await this.db.read({ username: username.toLowerCase() })
        if (!user) return Boom.unauthorized('Invalid user!')

        const match = await passwordHelper.comparePassword(password, user.password)
        if (!match) return Boom.unauthorized('Invalid username or password!')

        const token = jwt.sign({
          username, id: user.id
        }, this.secret)

        return {
          token
        }
      }
    }
  }
}

module.exports = AuthRoutes