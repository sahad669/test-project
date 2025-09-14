import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    unique: true,
    enum: ["admin", "employee"],
    default: "employee",
  },
});

const roleModel = mongoose.model("role", roleSchema);
export default roleModel;

