const iCrud = require('../interfaces/interfaceCrud')

class ContextStrategy extends iCrud {
  constructor(strategy) {
    super()
    this._database = strategy
  }
  connect() { return this._database.connect() }
  isConnected() { return this._database.isConnected() }
  create(item) { return this._database.create(item) }
  read(item, skip, limit) { return this._database.read(item, skip, limit) }
  update(id, item) { return this._database.update(id, item) }
  delete(id) { return this._database.delete(id) }
}

module.exports = ContextStrategy