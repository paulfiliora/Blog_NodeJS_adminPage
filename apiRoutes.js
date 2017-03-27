const express = require('express');

const router = express.Router();

const blogApp = require('./blogApp')

// body parser middleware
const parser = require('body-parser');

//parses requests with the content type of `application/json`
router.use(parser.json());

//get posts
router.get('/posts', (request, response, next) => {
	next();
});

//get post based on ID
router.get('/post/:postId', (request, response, next) => {
	const id = parseInt(request.params.postId, 10);
	blogApp.getItem(id);

	response.header('Content-Type', 'application/json');
	response.send(blogApp.getItem(id));
});


// post posts
router.post('/posts', (request, response, next) => {
	const requestBody = request.body;

	// Add a post
	blogApp.createItem(requestBody);

	next();
});

// put post
router.put('/post/:id', (request, response, next) => {
	const id = parseInt(request.params.id, 10);
	const dataPayload = request.body;
	Object.keys(dataPayload).forEach((key) => {
		blogApp.updateItem(id, 'data.' + key, dataPayload[key]);
	})
	next();
}); // post

// delete post
router.delete('/post/:id', (request, response, next) => {
	const id = parseInt(request.params.id, 10);
	blogApp.deleteItem(id);
	next();
}); // delete

router.use((request, response) => {
	response.header('Content-Type', 'application/json');
	response.send(blogApp.getItems());
});


module.exports = router;