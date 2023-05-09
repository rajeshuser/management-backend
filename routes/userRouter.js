const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const UserModel = require("../models/UserModel");

dotenv.config();

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
	const users = await UserModel.find({});
	res.status(200).send(users);
});

userRouter.post("/login", async (req, res) => {
	try {
		const token = req.get("authorization");
		if (token) {
			const userDoc = await jwt.verify(token, process.env.SECRET);
			if (userDoc) {
				res.status(201).send({
					message: "Login successful"
				});
			}
		} else {
			const user = req.body;
			const userDoc = await UserModel.findOne({ email: user.email });
			if (userDoc) {
				console.log(user.password, userDoc.password);
				const arePasswordsSame = await bcrypt.compare(user.password, userDoc.password);
				if (arePasswordsSame) {
					const token = await jwt.sign(user, process.env.SECRET);
					res.status(201).send({ token });
				} else {
					res.status(400).send({
						error: "Wrong password"
					});
				}
			} else {
				res.status(404).send({
					error: "User not found"
				});
			}
		}
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
});

userRouter.post("/signup", async (req, res) => {
	try {
		const user = req.body;
		user.password = await bcrypt.hash(user.password, 3);
		const userDoc = await UserModel(user);
		await userDoc.save();
		res.status(201).send({
			message: "Signup successful"
		});
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
});

module.exports = userRouter;
