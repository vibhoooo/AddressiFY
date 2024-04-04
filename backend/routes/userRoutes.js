const express = require("express");
const router = express.Router();
const { signupUser } = require("../controllers/userControllers");
const { loginUser } = require("../controllers/userControllers");

router.route(
	"/signup"
).post(
	signupUser
);
router.route(
	"/login"
).post(
	loginUser
);

module.exports = router;