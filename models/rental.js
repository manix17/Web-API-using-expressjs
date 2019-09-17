const mongoose = require("mongoose");

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
        dailyRentalRate: { type: Number, required: true }
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
    dailyRentalRate: { type: Number }
  })
);

validate;
