import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes";
import dotenv from "dotenv"
dotenv.config();
const app = express();
app.use(cors());
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const PORT = process.env.PORT;
app.use(express.json());
app.use(router);

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.xnc1gth.mongodb.net/FreiosSupremos?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("conected on MongoDb");
  })
  .catch((err) => {
    console.log("error in Db connection", err.message);
  });

app.listen(PORT, () => console.log("listening on port" + PORT));
