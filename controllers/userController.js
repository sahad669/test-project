
import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { email, password, name, role } = req.body;

  if (!email || !password || !name || !role) {
    return res.status(400).json({ message: "All fields required" });
  }

  const userExist = await userModel.findOne({ email });
  if (userExist) {
    return res.status(409).json({ message: "Email already exists" });
  }

  const hashpass = await bcrypt.hash(password, 10);
  const newUser = await userModel.create({ role, name, email, password: hashpass });

  const token = jwt.sign(
    { userid: newUser._id, email, role },
    process.env.JWT_SECRET
  );

  res.status(201).json({
    message: "User created successfully",
    token,
    userid: newUser._id,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const userExist = await userModel.findOne({ email });
  if (!userExist) {
    return res.status(404).json({  message: "User not found" });
  }

  const verified = await bcrypt.compare(password, userExist.password);
  if (!verified) {
    return res.status(401).json({  message: "Password not match" });
  }

  const token = jwt.sign(
    { userid: userExist._id, email, role: userExist.role },
    process.env.JWT_SECRET
  );

  res.status(200).json({

    message: "Logged in successfully",
    token,
    userid: userExist._id,
  });
};

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

