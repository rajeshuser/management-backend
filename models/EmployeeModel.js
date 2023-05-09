const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
	{
		firstName: String,
		lastName: String,
		email: String,
		department: String,
		salary: Number
	},
	{
		versionKey: false
	}
);

const EmployeeModel = new mongoose.model("employee", employeeSchema);

module.exports = EmployeeModel;
