const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50
  }
});

const Genre = mongoose.model("Genre", genreSchema);

function validateGenre(data) {
  const genreSchema = Joi.object({
    name: Joi.string()
      .required()
      .min(3)
      .max(50)
      .trim()
  });
  const result = genreSchema.validate(data);
  return result;
}

module.exports.Genre = Genre;
module.exports.validate = validateGenre;
module.exports.genreSchema = genreSchema;
