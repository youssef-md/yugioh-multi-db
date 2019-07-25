class NotImplementedException extends Error {
  constructor() { super("Not Implemented Exception!") }
}

class iCRUD { // if an extending class didn't implement one of these methods throw an exception
  create(item) { throw new NotImplementedException() }
  read(query) { throw new NotImplementedException() }
  update(id, item) { throw new NotImplementedException() }
  delete(id) { throw new NotImplementedException() }
}

class ContextStrategy {
  constructor(strategy) { this._database = strategy }

  create(item) { return this._database.create(item) }
  read(item) { return this._database.read(item) }
  update(id, item) { return this._database.update(id, item) }
  delete(id) { return this._database.delete(id) }
}

class MongoDB extends iCRUD { // implements all the needed methods from the interface CRUD
  constructor() { super() }

  create(item) { console.log(`Creating the item ${item.name} in MongoDB...`) }
  read(query) { console.log(`Reading the query ${query} in MongoDB...`) }
  update(id, item) { console.log(`Updating the item with id ${id} in MongoDB...`) }
  delete(id) { console.log(`Deleting the item with id ${id} in MongoDB...`) }
}

class Postgres extends iCRUD { // don't implement all the needed methods from the interface CRUD
  constructor() { super() }

  create(item) { console.log(`Creating the item ${item.name} in Postgres`) }
}

const card = { id: 1, name: 'Dark Magician', atk: 2500, def: 2300, type: 'fiend' }

const contextMongo = new ContextStrategy(new MongoDB()) // Since the MongoDB Class implements all the needed methods, we can call them
contextMongo.create(card)
contextMongo.read('select *')
contextMongo.update(card.id, { name: 'Kuriboh' })
contextMongo.delete(card.id)

const contextPostgres = new ContextStrategy(new Postgres()) // Since the Postgres Class don't implement all the needed methods, we get and Exception
contextPostgres.create(card)
// contextPostgres.read() -> Not Implemented Exception !