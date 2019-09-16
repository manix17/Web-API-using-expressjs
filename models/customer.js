const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100
    },
    phone: { type: Number, required: true, minlength: 6, maxlength: 10 },
    isGold: { type: Boolean, default: false }
  })
);

function validateCustomer(data) {
  const customerSchema = Joi.object({
    name: Joi.string()
      .required()
      .min(3)
      .max(100)
      .trim(),
    phone: Joi.number(),
    isGold: Joi.boolean()
  });
  const result = customerSchema.validate(data);
  return result;
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;
