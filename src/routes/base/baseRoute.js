class BaseRoute {
  static methods() {
    return Object.getOwnPropertyNames(this.prototype)
      .filter(method => method !== 'constructor' && !method.startsWith('_')) // don't count constructor and private _methods
  }
}

module.exports = BaseRoute