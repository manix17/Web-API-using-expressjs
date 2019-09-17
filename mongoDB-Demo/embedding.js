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

const authorSchema = new mongoose.Schema({
  name: String,
  website: String,
  bio: String
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    authors: [authorSchema]
  })
);

async function createCourse(name, authors) {
  let course = new Course({
    name,
    authors
  });

  course = await course.save();
  console.log("Course : ", course);
}

async function listCourse() {
  const courses = await Course.find().select("name authors");
  console.log("Courses : ", courses);
}

async function updateCourse(courseId) {
  let course = await Course.findById(courseId);
  course.author.name = "Manish";
  const result = await course.save();
  console.log(result);
}

async function updateCourseDirectly(courseId) {
  let course = await Course.update(
    { _id: courseId },
    { $set: { "author.name": "John" } }
  );
  console.log(course);
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  console.log(await course.save());
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  console.log(await course.save());
}

// createCourse("Angular JS", [
//   new Author({ name: "Varun" }),
//   new Author({ name: "Manish" }),
//   new Author({ name: "Ashok" })
// ]);
// listCourse();
// updateCourse("5d8070d1e20ad71560b47fe6");
// updateCourseDirectly("5d8070d1e20ad71560b47fe6");

// addAuthor("5d8075f8e5faf31fd4287212", new Author({ name: "Rakshak" }));

removeAuthor("5d8075f8e5faf31fd4287212", "5d8077756f3e380b28c1f8d1");
