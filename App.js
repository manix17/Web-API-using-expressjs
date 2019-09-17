var express = require("express");
const log = require("./middleware/logger");
const morgan = require("morgan");
const config = require("config");
const debug = require("debug")("app:startup"); //for Debugging
// const dbDebugger = require("debug")("app:db");
// const courses = require("./routes/courses");
const mongoose = require("mongoose");

//Routes Import
const customers = require("./routes/customers");
const home = require("./routes/home");
const genres = require("./routes/genres");
const movies = require("./routes/movies");

var app = express();

//Middlewares
app.use(express.json());
app.use(log);
app.use(express.static("public"));

console.log(`Environment:  '${app.get("env")}'`);

if (app.get("env") === "development") {
  app.use(morgan("dev"));
  debug("morgan enabled...");
}

// app.use("/api/courses", courses); // Using the Courses Router
app.use(home); //Server root router for serving Template engine
app.use("/api/customers", customers);
app.use("/api/genres", genres);
app.use("/api/movies", movies);

//Configuration
// console.log("Appplication Name : ", config.get("name"));
// console.log("Mail Server host : ", config.get("mail.host"));
// console.log("Mail Password : ", config.get("mail.password"));

//DB Work
// dbDebugger("connected to Database....");

app.set("view engine", "pug");
app.set("views", "./views");

mongoose
  .connect(config.get("mongoConString"), {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    debug("Connected to MongoDB..");
  })
  .catch(() => {
    debug("Connecting to MongoDB failed..");
  });

const port = 3000;
app.listen(port, () => {
  console.log(`Listenting on Port : ${port}`);
});
