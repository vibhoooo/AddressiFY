const mysql = require("mysql");
const dotenv = require("dotenv").config();

const pool = () => {
	try {
		const connection = mysql.createPool(
			{
				host: process.env.host,
				user: process.env.user,
				password: process.env.password,
				database: process.env.database
			}
		);
		console.log(
			"Database connected: ",
			process.env.host,
			process.env.database
		); 
		return connection
	}
	catch(err) {
		console.log(err);
		process.exit(1);
	}
};

module.exports = pool;

