import userModel from "../models/userModel.js";
import roleModel from "../models/roleModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//register
// export const register = async (req, res) => {
//   const { email, password, name, role } = req.body;

//   if (!email || !password || !name || !role) {
//     return res.status(400).json({ message: "All fields required" });
//   }

//   const userExist = await userModel.findOne({ email });
//   if (userExist) {
//     return res.status(409).json({ message: "Email already exists" });
//   }

//   const hashpass = await bcrypt.hash(password, 10);
//   const newUser = await userModel.create({
//     role,
//     name,
//     email,
//     password: hashpass,
//   });
//   const userRole = await roleModel.findById(newUser.role);

//   const token = jwt.sign(
//     { userid: newUser._id, email, role: userRole.role },
//     process.env.JWT_SECRET
//   );

//   res.status(201).json({
//     message: "User created successfully",
//     token,
//     userid: newUser._id,
//   });
// };

// //login
// export const login = async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(400).json({ message: "Email and password are required" });
//   }

//   const userExist = await userModel.findOne({ email });
//   if (!userExist) {
//     return res.status(404).json({ message: "User not found" });
//   }

//   const verified = await bcrypt.compare(password, userExist.password);
//   if (!verified) {
//     return res.status(401).json({ message: "Password not match" });
//   }

//   const userRole = await roleModel.findById(userExist.role);

//   const token = jwt.sign(
//     { userid: userExist._id, email, role: userRole.role },
//     process.env.JWT_SECRET
//   );

//   res.status(200).json({
//     message: "Logged in successfully",
//     token,
//     userid: userExist._id,
//   });
// };

// //create employee
// export const createEmployee = async (req, res) => {
//   try {
//     const { name, email, password, role, department } = req.body;

//     if (!name || !email || !password || !role || !department) {
//       return res.status(400).json({
//         message: "Name, Email, Password, Role, and Department are required",
//       });
//     }

//     const userExist = await userModel.findOne({ email });
//     if (userExist) {
//       return res.status(409).json({ message: "Email already exists" });
//     }

//     const hashedPass = await bcrypt.hash(password, 10);

//     const newEmployee = await userModel.create({
//       name,
//       email,
//       password: hashedPass,
//       role,
//       department,
//     });

//     res.status(201).json({
//       message: "Employee created successfully",
//       employee: newEmployee,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // get all employee + filter by anme and department
// export const getAllEmployees = async (req, res) => {
//   try {
//     const { department, name } = req.query;
//     const filter = {};

//     if (department) {
//       filter.department = department;
//     }

//     if (name) {
//       filter.name = { $regex: name, $options: "i" };
//     }

//     const employees = await userModel.find(filter);

//     if (employees.length === 0) {
//       return res.status(404).json({ message: "No Employees Found" });
//     }

//     res.status(200).json(employees);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// //edit employee
// export const editEmployee = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const data = req.body;
//     const updatedemployee = await userModel.findByIdAndUpdate(id, data, {
//       new: true,
//     });
//     if (!updatedemployee) {
//       return res.status(404).json({ error: "Employee not found" });
//     }
//     res.json({
//       message: "employee updated successfully",
//       updatedemployee,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // delete employee
// export const deleteEmployee = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const deletedEmployee = await userModel.findByIdAndDelete(id);
//     if (!deletedEmployee) {
//       return res.status(404).json({ error: "Employee not found" });
//     }
//     res.json({ message: "Employee deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // get employee by id
// export const getEmployeeById = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const employee = await userModel.findById(id);

//     if (!employee) {
//       return res.status(404).json({ error: "Employee not found" });
//     }

//     res.status(200).json(employee);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const userWithEmail = await userModel.findOne({ email });
  if (userWithEmail) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // 👇 find the employee role (default role)
  const defaultRole = await roleModel.findOne({ role: "employee" });
  const newUser = await userModel.create({
    name,
    email,
    password: hashedPassword,
    role: defaultRole._id, 
  });

  res.json({ message: "User created successfully", newUser });
};



export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const userExist = await userModel.findOne({ email });
  if (!userExist) {
    return res.status(404).json({ message: "User not found" });
  }

  const verified = await bcrypt.compare(password, userExist.password);
  if (!verified) {
    return res.status(401).json({ message: "Password not match" });
  }

  const userRole = await roleModel.findById(userExist.role);

  const token = jwt.sign(
    { userid: userExist._id, email, role: userRole.role },
    process.env.JWT_SECRET
  );

  res.status(200).json({
    message: "Logged in successfully",
    token,
    userid: userExist._id,
  });
};


//create employee
export const createEmployee = async (req, res) => {
  try {
    const { name, email, password, role, department } = req.body;

    if (!name || !email || !password || !role || !department) {
      return res.status(400).json({
        message: "Name, Email, Password, Role, and Department are required",
      });
    }

    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const newEmployee = await userModel.create({
      name,
      email,
      password: hashedPass,
      role,
      department,
    });

    res.status(201).json({
      message: "Employee created successfully",
      employee: newEmployee,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all employee + filter by anme and department

export const getAllEmployees = async (req, res) => {
  try {
    const { department, name } = req.query;
    const filter = {};

    // 👉 Find the role id for employee
    const employeeRole = await roleModel.findOne({ role: "employee" });
   

    // Only fetch users with role = employee
    filter.role = employeeRole._id;

    if (department) {
      filter.department = department;
    }

    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    const employees = await userModel.find(filter);

    if (employees.length === 0) {
      return res.status(404).json({ message: "No Employees Found" });
    }

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//edit employee
export const editEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedemployee = await userModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedemployee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json({
      message: "employee updated successfully",
      updatedemployee,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete employee
export const deleteEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedEmployee = await userModel.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get employee by id
export const getEmployeeById = async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await userModel.findById(id);

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};