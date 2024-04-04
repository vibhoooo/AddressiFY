const express = require("express");
const validateTokenHandlerUser = require("../middlewares/validateTokenHandlerUser");
const { submit } = require("../controllers/addressControllers");
const { display } = require("../controllers/addressControllers");
const router = express.Router();

router.route(
	"/submit"
).post(
	validateTokenHandlerUser,
	submit
);

router.route(
	"/display"
).get(
	validateTokenHandlerUser,
	display
);

module.exports = router;