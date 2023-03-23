const Joi = require('joi');

const personalSchema = Joi.object({
  salary: Joi.number().required(),
  savings: Joi.number().required(),
  cost: Joi.number().required(),
  footage: Joi.number().required(),
  procent: Joi.number().required(),
  passiveIncome: Joi.number().required(),
  year: Joi.number(),
  month: Joi.number(),
});

// const personalSchema = {
//   registerSchema,
//   loginSchema,
//   subscriptionSchema,
//   verifyEmailSchema,
// };

module.exports = { personalSchema };
