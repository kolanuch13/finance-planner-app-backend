const Joi = require('joi');

const dateSchema = Joi.object({
  date: Joi.date().required(),
});

module.exports = {
  dateSchema,
};
