const Joi = require("joi");

const personalSchema = Joi.object({
  salary: Joi.string().required(),
  savings: Joi.string().required(),
  cost: Joi.string().required(),
  footage: Joi.string().required(),
  procent: Joi.string().required(),
  year: Joi.string(),
  month: Joi.string(),
});

// const personalSchema = {
//   registerSchema,
//   loginSchema,
//   subscriptionSchema,
//   verifyEmailSchema,
// };

module.exports = { personalSchema };
