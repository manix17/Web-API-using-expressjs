const express = require("express");
const Joi = require("@hapi/joi");
const router = express.Router();
const mongoose = require("mongoose");

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 255,
      trim: true
    }
  })
);

router.get("/", async function(req, res) {
  const courses = await Course.find().sort("name");
  res.status(200).send(courses);
});

router.post("/", async (req, res) => {
  const result = courseSchema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  let course = new Course({ name: req.body.name });
  course = await course.save();
  res.status(201).send(course);
});

router.put("/:id", async (req, res) => {
  const result = courseSchema.validate(req.body);
  // console.log("put called", result);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }
  const course = await Course.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name
    },
    { new: true }
  );
  if (!course) {
    return res.status(404).send("Course Not Found");
  }
  res.send(course);
});

router.delete("/:id", async (req, res) => {
  const course = await Course.findByIdAndRemove(req.params.id);
  if (!course) return res.status(404).send("Course Not Found");
  res.send(course);
});

const courseSchema = Joi.object({
  name: Joi.string()
    .trim()
    .required()
});

module.exports = router;
