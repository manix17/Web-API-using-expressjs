var express = require("express");
// const Joi = require("@hapi/joi");
const log = require("./middleware/logger");
const morgan = require("morgan");
const config = require("config");
const debug = require("debug")("app:startup"); //for Debugging
const dbDebugger = require("debug")("app:db");
const courses = require("./routes/courses");
const home = require("./routes/home");
const mongoose = require("mongoose");

var app = express();

const uri = config.get("mongodbConString");
debug("--------------------------ENTRY POINT---------------------------");

//MongoDB
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    debug("Connected to MongoDB");
  })
  .catch(err => debug("Could not Connect to mongoDb, Error: ", err));

//Mongoose Schema
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

mongoose.model({
  name: "Node Js",
  author: "Manish",
  tags: ["backend", "express"],
  isPublished: true
});

//Middlewares
app.use(express.json());
app.use(log);
app.use(express.static("public"));

console.log(`Environment:  '${app.get("env")}'`);

if (app.get("env") === "development") {
  app.use(morgan("dev"));
  debug("morgan enabled...");
}

app.use("/api/courses", courses); // Using the Courses Router
app.use(home); //Server root router for serving Template engine

//Configuration
console.log("Appplication Name : ", config.get("name"));
console.log("Mail Server host : ", config.get("mail.host"));
console.log("Mail Password : ", config.get("mail.password"));

//DB Work
dbDebugger("connected to Database....");

app.set("view engine", "pug");
app.set("views", "./views");

const port = 3000;
app.listen(port, () => {
  console.log(`Listenting on Port : ${port}`);
});
