const express = require("express");
const Joi = require("@hapi/joi");
const router = express.Router();

router.get("/", function(req, res) {
  res.status(200).send(courses);
});

router.post("/", (req, res) => {
  const result = courseSchema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const course = { id: courses.length + 1, name: req.body.name };
  courses.push(course);
  res.status(201).send(course);
});

router.put("/:id", (req, res) => {
  const result = courseSchema.validate(req.body);
  console.log("put called", result);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const course = courses.find(c => (c.id = parseInt(req.params.id)));
  if (!course) {
    res.status(404).send("Course Not Found");
    return;
  }
  course.name = req.body.name;
  res.status(200).send(course);
});

router.delete("/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("Course Not Found");
    return;
  }
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.status(200).send(course);
});

const courseSchema = Joi.object({
  name: Joi.string()
    .alphanum()
    .required()
});

let courses = [
  { id: 1, name: "Querying in MongoDB" },
  { id: 2, name: "Introduction to C#" },
  { id: 3, name: "Async & Await" }
];

module.exports = router;
