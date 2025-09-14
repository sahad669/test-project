import roleModel from "../models/roleModel.js";

// create role
export const createRole = async (req, res) => {
  const { role } = req.body;
  if (!role) {
    return res.json({ error: "fill this field" });
  }
  const newRole = await roleModel.create({ role });
  res.status(201).json({ message: "Role Created", newRole });
};

// get all roles
export const getRole = async (req, res) => {
  const role = await roleModel.find({});
  if (role.length === 0) {
    return res.json({ error: "No roles found" });
  }
  res.json(role);
};
