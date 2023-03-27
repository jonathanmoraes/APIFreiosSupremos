import express, { Response, Request } from "express";
import mongoose from "mongoose";
import cors from "cors" ;
import router from "./routes";
require('dotenv').config()
const app = express();
const corsOptions: cors.CorsOptions = {
      methods:"GET,POST,PUT,DELETE",
      origin:"*"
}
app.use(cors(corsOptions))
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
app.use(express.json());
app.use(router);

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.xnc1gth.mongodb.net/FreiosSupremos?retryWrites=true&w=majority`
  )
  .then((data) => {
    console.log("conected");
  })
  .catch((err) => {
    console.log("error in Db connection", err.message);
  });

app.listen(3000);
