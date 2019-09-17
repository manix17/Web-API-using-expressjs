const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const { genreSchema } = require("./genre");

const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    title: { type: String, required: true, minlength: 3, maxlength: 50 },
    genre: { type: genreSchema, required: true },
    numberInStock: Number,
    dailyRentalRate: Number
  })
);

function validateMovie(data) {
  const movieSchema = Joi.object({
    title: Joi.string()
      .required()
      .min(3)
      .max(50),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().positive(),
    dailyRentalRate: Joi.number().positive()
  });
  return movieSchema.validate(data);
}

exports.Movie = Movie;
exports.validate = validateMovie;
