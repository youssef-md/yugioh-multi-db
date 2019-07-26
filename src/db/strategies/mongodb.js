const iCrud = require('./interfaces/interfaceCrud')

class MongoDB extends iCrud {
  constructor() { super() }

  create(item) { console.log(`Creating the item ${item.name} in MongoDB...`) }
  read(query) { console.log(`Reading the query ${query} in MongoDB...`) }
  update(id, item) { console.log(`Updating the item with id ${id} in MongoDB...`) }
  delete(id) { console.log(`Deleting the item with id ${id} in MongoDB...`) }
}

module.exports = MongoDB