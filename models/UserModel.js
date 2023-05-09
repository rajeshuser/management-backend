const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		email: String,
		password: String
	},
	{
		versionKey: false
	}
);

const UserModel = new mongoose.model("user", userSchema);

module.exports = UserModel;
