// grab db
const low = require('lowdb');
// instantiate db
const db = low('./db.json');

db._.mixin(require('lodash-id'))

// default
db.defaults({posts: [] }).write();

const blogApp = {};

blogApp.getItems = () => {
	return db.get('posts').value();
}

blogApp.getItem = (id) => {
	const post = db.get('posts').getById(id).value()
	return(post)
}

blogApp.createItem = (itemToCreate) => {
	db.get('posts').push({
		id: Date.now(),
		data: itemToCreate
	}).write();
}

blogApp.updateItem = (id, key, propertyToUpdate) => {
	db.get('posts')
		  .find({ id })
		  .set(key, propertyToUpdate)
		  .write()
}

blogApp.deleteItem = (id) => {
	db.get('posts')
		.remove({ id })
		.write();
}

module.exports = blogApp;
