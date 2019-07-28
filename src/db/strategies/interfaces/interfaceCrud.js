class NotImplementedException extends Error {
  constructor() { super("Not Implemented Exception!") }
}

class iCrud { // if an extending class didn't implement one of these methods throw an exception
  connect() { throw new NotImplementedException() }
  isConnected() { throw new NotImplementedException() }
  create(item) { throw new NotImplementedException() }
  read(item) { throw new NotImplementedException() }
  update(id, item) { throw new NotImplementedException() }
  delete(id) { throw new NotImplementedException() }
}

module.exports = iCrud