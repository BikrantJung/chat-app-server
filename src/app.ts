// Modules Import
import express from "express";
import { resolve } from "path";
import dotenv from "dotenv";
import { connectDB } from "./config/db";

// Relative Imports

dotenv.config({
  path: resolve(__dirname, "../.env"),
});
connectDB();
const app = express();

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(4000, () => {
  console.log("Server Running on port 4000");
});
