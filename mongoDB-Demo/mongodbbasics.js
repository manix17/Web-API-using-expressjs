const config = require("config");
const mongoose = require("mongoose");
const debug = require("debug")("app:startup"); //for Debugging

const conString = config.get("mongoConString");
mongoose
  .connect(conString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    debug("Connected to MongoDB");
  })
  .catch(err => debug("Could not Connect to mongoDb, Error: ", err));

//Creating a course Schema
const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 255 },
  category: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    enum: ["Mobile", "Web", "Network"]
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: "The tags must have atleast one tag."
    }
  },
  date: { default: Date.now, type: Date },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function() {
      return this.isPublished;
    },
    min: 10,
    max: 2000,
    get: v => Math.round(v),
    set: v => Math.round(v)
  }
});
//Creating a Class(Model) based on schema
const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  //Creating a course from Course Model
  const course = new Course({
    name: "Angular Js",
    category: "Web",
    author: "Manish",
    tags: [],
    isPublished: false
  });

  try {
    const result = await course.save();
    debug(result);
  } catch (ex) {
    debug(ex.message);
  }
}
createCourse();

async function getCourses() {
  const courses = await Course.find({ author: "Manish", isPublished: true })
    .limit(1)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}
// getCourses();
