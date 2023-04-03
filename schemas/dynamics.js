const Joi = require('joi');

const dateSchema = Joi.object({
  month: Joi.number(),
  year: Joi.number(),
});

module.exports = {
  dateSchema,
};
