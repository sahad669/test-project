import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  departmentName: { type: String, required: true, unique: true },
  description: { type: String },
});

const departmentModel = mongoose.model("department", departmentSchema);


export default departmentModel;

