// grab db
const low = require('lowdb');
// instantiate db
const db = low('./db.json');

// default
db.defaults({
	users: [],
}).write();

// Places manager object
const Users = {};

Users.createNewUser = (email, name, password) => {
	if (!email || !name || !password) {
		return false;
	}
	
	db.get('users')
		.push({
			email,
			name,
			password
		})
		.write();

	return true;
}

Users.login = (email, password) => {
	if (!email || !password) {
		return {
			error: true,
			reason: "Email or password not valid",
			errorID: 1
		};
	}

	const users = db.get('users')
					.filter((user) => {
						return user.email === email;
					})
					.value();
	if (users.length === 0) {
		return {
			error: true,
			reason: "User does not exist",
			errorID: 2
		};		
	}

	// if we are here, user has been found
	const user = users[0];
	if (user.password !== password) {
		return {
			error: true,
			reason: "Password is incorrect",
			errorID: 3
		};
	}

	// if we are here then user is valid and pw is correct
	return {
		error: false,
		user: user,
		loginTime: Date.now(),
	};
}

module.exports = Users;