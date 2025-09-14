import departmentModel from "../models/departmentModel.js";

// add department
export const addDepartment = async (req, res) => {
  const { departmentName, description } = req.body;
  if (!departmentName || !description) {
    return res.json({ error: "fill all the fields" });
  }
  const newDepartment = await departmentModel.create({ departmentName, description });
  res.status(201).json({ message: "Department Created Successfully", newDepartment });
};

// get all departments
export const getAllDepartment = async (req, res) => {
  const department = await departmentModel.find({});
  if (department.length === 0) {
    return res.json({ error: "No Department Found" });
  }
  res.json(department);
};

// delete department
export const deleteDepartment = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteDepartment = await departmentModel.findByIdAndDelete(id);
    if (!deleteDepartment) {
      return res.status(404).json({ error: "Department Not Found" });
    }
    res.json({ message: "Department Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
