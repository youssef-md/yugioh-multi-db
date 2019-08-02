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
      handler: (req, headers) => {
        try {
          const { skip, limit, name } = req.query
          console.log(name);
          let query = {}
          if (name) query.name = name

          //if (isNaN(skip) || isNaN(limit)) throw Error('Query params NaN')

          return this._db.read(query, parseInt(skip), parseInt(limit)) // Hapi resolves promises
        } catch (error) {
          console.log('Internal error', error)
          return "Internal error in the server"
        }
      }
    }
  }
}
module.exports = CardRoutes