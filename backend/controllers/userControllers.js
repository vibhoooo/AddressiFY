const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/dbConnection");
const connection = pool();

// @desc Sign Up
// @route POST /users/signup
// @access public
const signupUser = asyncHandler(
	async (req, res, next) => {
		const { username, email, password } = req.body;
		if (!username || !email || !password) {
			res
				.status(
					400
				);
			throw new Error(
				"All fields are mandatory!"
			);
		}
		const userAvailable = connection.query(
			`SELECT email FROM users WHERE email = ?`, [email], async (error, results, fields) => {
				if (error) {
				    console.error(error);
				    return;
				}
				if (results.length > 0) {
					res
						.status(
							400
						);
					const err = new Error("User already registered!");
					err.status = 400;
					next(err);
				}
			}
		);
		const hashedPassword = await bcrypt.hash(
			password,
			10
		);
		const user = connection.query(
			`INSERT INTO users (username, email, password) VALUES (?, ?, ?)`, [username, email, hashedPassword], async (error, results, fields) => {
				if (error) {
					console.error(error);
					return;
				}
				if (results.affectedRows == 1) {
					res
						.status(
							201
						)
						.json(
							{
								email
							}
						);
				}
				else {
					res
						.status(
							500
						);
					const err = new Error("Registration falied!");
					err.status = 500;
					next(err);
				}
			}
		);
	}
);
// @desc Log In
// @route POST /users/login
// @access public
const loginUser = asyncHandler(
	async (req, res, next) => {
		const { email, password } = req.body;
		if (!email || !password) {
			res
				.status(
					400
				);
			throw new Error(
				"All fields are mandatory!"
			);
		}
		const user = connection.query(
			`SELECT * FROM users WHERE email = ?`, [email], async (error, results, fields) => {
				if (error) {
					console.error(error);
					return;
				}
				if (results.length > 0 && (await bcrypt.compare(password, results[0].password))) {
					const accessToken = jwt.sign(
						{
							user: {
								username: results[0].username,
								user_email: results[0].email,
								user_id: results[0].id
							}
						},
						process.env.ACCESS_TOKEN_SECRET_USER,
						{
							expiresIn: "60m"
						}
					);
					res
						.status(
							200
						)
						.json(
							{
								accessToken,
								user_id: results[0].id
							}
						);
				}
				else {
					res
						.status(
							401
						);
					const err = new Error("Email or Password not valid!");
					err.status = 401;
					next(err);
				}
			}
		);
	}
);

module.exports = {
	signupUser,
	loginUser
};
