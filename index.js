// server
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connection = require("./database");
const userRouter = require("./routes/userRouter");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/users", userRouter);

app.get("/", (req, res) => {
	res.status(200).send({
		message: "Home"
	});
});

connectThenListen();

async function connectThenListen() {
	try {
		await connection;
		console.log("App is connected to mongodb");
		app.listen(process.env.PORT, () => {
			console.log("App is listening at", `http://localhost:${process.env.PORT}`);
		});
	} catch (error) {
		console.log({ error: error.message });
	}
}
