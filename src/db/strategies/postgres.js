const iCrud = require('./interfaces/interfaceCrud')

class Postgres extends iCRUD { // don't implement all the needed methods from the interface CRUD
  constructor() { super() }

  create(item) { console.log(`Creating the item ${item.name} in PostgreSQL...`) }
  read(query) { console.log(`Reading the query ${query} in PostgreSQL...`) }
  update(id, item) { console.log(`Updating the item with id ${id} in PostgreSQL...`) }
  delete(id) { console.log(`Deleting the item with id ${id} in PostgreSQL...`) }
}

module.exports = Postgres