var express = require("express");
const Joi = require("@hapi/joi");
const log = require("./middleware/logger");
const morgan = require("morgan");
const config = require("config");
const debug = require("debug")("app:startup"); //for Debugging
const dbDebugger = require("debug")("app:db");
const courses = require("./routes/courses");
const home = require("./routes/home");
// const mongoose = require("mongoose");

var app = express();

const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://m001-student:classymango525@sandbox-shard-00-01-usnyn.mongodb.net";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  debug("Error: ", err);
  if (!err) {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
  }
});

//MongoDB
// mongoose
//   .connect(
//     "mongodb+srv://m001-student:classymango525@sandbox-usnyn.mongodb.net",
//     { useNewUrlParser: true }
//   )
//   .then(() => {
//     debug("Connected to MongoDB");
//   })
//   .catch(err => debug("Could not Connect to mongoDb, Error: ", err));

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
