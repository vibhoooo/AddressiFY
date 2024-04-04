const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const errorHandler = require("./middlewares/errorHandler");
const port = process.env.PORT;
const cors = require("cors");
app.use(
	cors()
);
app.use(
	express.json()
);
app.use(
	"/users",
	require("./routes/userRoutes")
);
app.use(
	"/address",
	require("./routes/addressRoutes")
);
app.use(
	errorHandler
);
app.listen(
	port,
	() => {
		console.log(`Server running on port ${port}`);
	}
);