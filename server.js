import express from "express";
import dotenv from "dotenv";
import connect from "./connectDB.js";
import userRouter from "./routes/userRouter.js";
import departmentRouter from "./routes/departmentRouter.js";
import roleRouter from "./routes/roleRouter.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/role", roleRouter);
app.use("/api/department", departmentRouter);

connect();
app.listen(process.env.PORT, () => {
  console.log("server started");
});
