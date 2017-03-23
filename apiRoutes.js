const express = require('express');

const router = express.Router();

const TodoList = require('./todoList')

// body parser middleware
const parser = require('body-parser');

//parses requests with the content type of `application/json`
router.use(parser.json());

//define a route on `/hello/world`
router.get('/todos',(request, response, next) => {
	next();
});

//here's my issue. not passing in ID!!
router.get('/post/:postId',(request, response, next) => {
	// console.log(request.body)
	// const id = parseInt(request.params.id, 10);
	// const id = request.params.id
	// console.log("in router"+ id)

	TodoList.getItem();
	console.log("in the get 1: " +TodoList.getItem())
	// next();
	response.header('Content-Type', 'application/json');
	response.send(TodoList.getItem());
});


// post todos
router.post('/todos', (request, response, next) => {
	const requestBody = request.body;

	// Add a post
	TodoList.createItem(requestBody);

	next();
});

// put todo
router.put('/todo/:id', (request, response, next) => {
    const id = parseInt(request.params.id, 10);
   	const dataPayload = request.body;

	Object.keys(dataPayload).forEach((key) => {
		TodoList.updateItem(id, 'data.' + key , dataPayload[key]);
   	})
	next();
}); // todo



// delete todo
router.delete('/todo/:id', (request, response, next) => {
	const id = parseInt(request.params.id, 10);

	TodoList.deleteItem(id);
	next();
}); // delete

router.use((request, response) => {
	response.header('Content-Type', 'application/json');
	response.send(TodoList.getItems());
});


module.exports = router;