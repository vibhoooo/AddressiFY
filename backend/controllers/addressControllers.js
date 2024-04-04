const asyncHandler = require("express-async-handler");
const pool = require("../config/dbConnection");
const connection = pool();

// @desc Submit
// @route POST /address/submit
// @access private
const submit = asyncHandler(
	async (req, res, next) => {
		const { name, email, phone, address, pin, relation } = req.body;
		if (!name || !email || !phone || !address || !pin || !relation) {
			res
				.status(
					400
				);
			throw new Error(
				"All fields are mandatory!"
			);
		}
		const { user_id } = req.user;
		const submit = connection.query(
			`INSERT INTO address (name, email, phone, address, pin, relation, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)`, [name, email, phone, address, pin, relation, user_id], async (error, results, fields) => {
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
					const err = new Error("Submisssion falied!");
					err.status = 500;
					next(err);
				}
			}
		);
	}
);
// @desc Display
// @route GET /address/display
// @access private
const display = asyncHandler(
	async (req, res, next) => {
		const { user_id } = req.user;
		const display = connection.query(
			`SELECT * FROM address WHERE user_id = ?`, [user_id], async (error, results, fields) => {
				if (error) {
					console.error(error);
					return;
				}
				if (results.length > 0) {
					res
						.status(
							200
						)
						.json(
							{
								results
							}
						);
				}
				else {
					res
						.status(
							400
						);
					const err = new Error("No record found!");
					err.status = 400;
					next(err);
				}
			}
		);
	}
);

module.exports = {
	submit,
	display
};