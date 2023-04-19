// Modules Import
import express from "express";
import { resolve } from "path";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { userRoutes } from "./routes/userRouter";
import bodyParser from "body-parser";
// Relative Imports

dotenv.config({
  path: resolve(__dirname, "../.env"),
});
connectDB();

const app = express();
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
