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
      handler: (req, headers) => this._db.read() // Hapi resolves promises
    }
  }
}

module.exports = CardRoutes