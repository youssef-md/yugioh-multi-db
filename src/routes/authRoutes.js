const Joi = require('joi')
const Boom = require('boom')
const BaseRoute = require('./base/baseRoute')
const jwt = require('jsonwebtoken')
const failAction = (req, headers, error) => { throw error }

const USER = {
  username: 'YoussefMuhamad',
  password: '123123'
}

class AuthRoutes extends BaseRoute {

  constructor(secret) {
    super()
    this.secret = secret
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

        if (username.toLowerCase() !== USER.username.toLocaleLowerCase() || password !== USER.password)
          return Boom.unauthorized()

        const token = jwt.sign({
          username, id: 1
        }, this.secret)

        return {
          token
        }
      }
    }
  }
}

module.exports = AuthRoutes