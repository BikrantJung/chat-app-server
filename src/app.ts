// Modules Import
import express from "express";
import { resolve } from "path";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
// Relative Imports
import { connectDB } from "./config/db";
import { userRoutes } from "./routes/userRouter";

dotenv.config({
  path: resolve(__dirname, "../.env"),
});
connectDB();

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  const { name } = req.body;
  console.log("Name", name);
  res.send({ data: name });
});

app.use("/api/user", userRoutes);

app.listen(4000, () => {
  console.log("Server Running on port 4000");
});
