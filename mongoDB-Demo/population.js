const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://m001-student:m001-mongodb-basics@sandbox-usnyn.mongodb.net/playground",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log("connected to MongoDb");
  })
  .catch(() => console.log("failed to Connect"));

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author"
    }
  })
);

const Author = mongoose.model(
  "Author",
  new mongoose.Schema({
    name: String,
    bio: String,
    website: String
  })
);

async function createAuthor(name, bio, website) {
  let author = new Author({
    name,
    bio,
    website
  });

  author = await author.save();
  console.log("Author : ", author);
}

async function createCourse(name, author) {
  let course = new Course({
    name,
    author
  });

  course = await course.save();
  console.log("Course : ", course);
}

async function listCourse() {
  const courses = await Course.find()
    .populate("author", "name website -_id")
    .select("name author");
  console.log("Courses : ", courses);
}

// createAuthor("Manish", "CS is my forte", "udemy.com");
// createCourse("Angular JS", "5d80676caaaae5154026d41c");
listCourse();
