const Joi = require("joi");

const dynamicSchema = Joi.object({
  lastYearInfo: Joi.array().items(
    Joi.object({
      expenses: Joi.number(),
      income: Joi.number(),
      acumulated: Joi.number(),
    })
  ),
  timeIsLeft: Joi.number(),
  acumulatedAsPercentage: Joi.number(),
  acumulatedMoney: Joi.number(),
  acumulatedSqMeters: Joi.number(),
  leftAcumulatedMoneyToMeter: Joi.number(),
});

module.exports = {
  dynamicSchema,
};
