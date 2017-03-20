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

	TodoList.updateItem(id, 'data.isDone', dataPayload.isDone);

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


    //   const author = function () { console.log("author"); };
    //   const books = function () { console.log("books"); };
    //   const viewBook = function (bookId) {
    //     console.log("viewBook: bookId is populated: " + bookId);
    //   };

    //   const routes = {
    //     '/home': () => {
    //         //Initializer on page load
    //         GET('/api/todos')
    //             .then((todoItems) => {
    //                 render(todoItems);
    //             });
    //     },
    //     '/post/:postId': (postId) => {
    //         //Initializer on page load
    //         GET('/api/todos/'+postId)
    //             .then((todoItems) => {
    //                 // render(onePost);
    //             });
    //     }
    // };

    // const router = Router(routes);

    // router.init();
    // router.setRoute('/home')


module.exports = router;