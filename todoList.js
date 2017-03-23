// grab db
const low = require('lowdb');
// instantiate db
const db = low('./db.json');

db._.mixin(require('lodash-id'))


// default
db.defaults({ todos: [] }).write();

const TodoList = {};

/*
	@func getItems
	@desc gets all todos
*/

TodoList.getItems = () => {
		// console.log(db.get('todos').value());
	// console.log("during regular get all: " +db.get('todos').value())


	return db.get('todos').value();
}

TodoList.getItem = (id) => {
	// console.log("in todos" + id)
	// console.log("before the getbyid" +db.get('todos').value())
	const post = db.get('todos').getById(id).value()
// console.log("after the getbyid: " +post)
return(post)
	// return db.get('todos')
	// .find({ id: 1489347514426 })
	// 	// .find({ id })
	// .value();
}

/*
	@func createItem
	@desc creates a new todo
*/

TodoList.createItem = (itemToCreate) => {
	db.get('todos').push({
		id: Date.now(),
		data: itemToCreate
	}).write();
}

TodoList.updateItem = (id, key, propertyToUpdate) => {
	db.get('todos')
		  .find({ id })
		  .set(key, propertyToUpdate)
		  .write()
}

TodoList.deleteItem = (id) => {
	db.get('todos')
		.remove({ id })
		.write();
}

module.exports = TodoList;
