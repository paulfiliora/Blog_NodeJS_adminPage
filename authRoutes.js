const express = require('express');

const authApp = express();

const Users = require('./users')

// parser session middleware
const parser = require('body-parser');

// pull in session middleware
const expressSession = require('express-session');

// use body parser
authApp.use(parser.json());

authApp.use(expressSession({
	secret: 'LOLSECRETZ'
}));

authApp.use((request, response, next) => {
	console.log(request.session.numAttempts)
	const now = Date.now();
	const numAttempts = request.session.numAttempts;
	const lastAttempt = request.session.lastAttempt !== null && request.session.lastAttempt;
	if (numAttempts >= 3 && now - lastAttempt > 10000) {
		request.session.numAttempts = 0;
		request.session.lastAttempt = null;
		next();
	}

	if (request.session.numAttempts >= 3) {
		request.session.lastAttempt = Date.now();
		response.header('Content-Type', 'application/json');
		response.send({error: 'Too many attempts, wait 24 hours'})
	}
	else {
		next();
	}
})

authApp.post('/auth/signup', (request, response) => {
	const {body} = request;

	// we want: email address
	// name
	// password

	const {email, name, password} = body;
	console.log(email, name, password);
	const isCreated = Users.createNewUser(email, name, password);

	response.header('Content-Type', 'application/json');
	if (isCreated) {
		response.send({success: true})
	}
	else {
		response.header('Content-Type', 'application/json');
		response.status(400)
		response.send({error: 'some fields not valid LOL'})
	}
});

// login route
authApp.post('/auth/login', (request, response) => {
	const body = request.body;

	console.log(body);
	const {email, password} = body;

	const loggedInState = Users.login(email.toLowerCase(), password);
	console.log(loggedInState);
	if (loggedInState.error === true) {
		// user has not logged in
		if (typeof request.session.numAttempts === "undefined") {
			request.session.numAttempts = 0;
		}
		else {
			request.session.numAttempts++;
		}
		response.header('Content-Type', 'application/json');
		response.send(loggedInState)
		return;
	}

	response.header('Content-Type', 'application/json');
	response.send({error: 'foobar'})
});

module.exports = authApp;