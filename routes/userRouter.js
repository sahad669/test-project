import express from "express";
import { createEmployee, login, register } from "../controllers/userController.js";
import { checkAdmin, isLogged } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", register);
router.post("/login", login);
router.post('/create',isLogged,checkAdmin,createEmployee)


export default router;
