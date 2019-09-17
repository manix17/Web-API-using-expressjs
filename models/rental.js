const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const Rental = mongoose.model(
  "Rental",
  new mongoose.Schema({
    customer: {
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true,
          trim: true,
          minlength: 3,
          maxlength: 100
        },
        phone: { type: Number, required: true, minlength: 6, maxlength: 10 },
        isGold: { type: Boolean, default: false }
      }),
      required: true
    },
    movie: {
      type: new mongoose.Schema({
        title: { type: String, required: true, minlength: 3, maxlength: 50 },
        dailyRentalRate: { type: Number, required: true, min: 0 }
      }),
      required: true
    },
    dateOut: {
      type: Date,
      default: Date.now
    },
    dateReturned: {
      type: Date
    },
    rentalFee: { type: Number, min: 0 }
  })
);

function validateRental(data) {
  const rentalSchema = Joi.object({
    customerId: Joi.string().required(),
    movieId: Joi.string().required()
  });
  return rentalSchema.validate(data);
}

exports.Rental = Rental;
exports.validate = validateRental;
