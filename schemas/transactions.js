const Joi = require('joi');

const category = ['expense', 'income'];

const availableCategories = [
  'products',
  'clothing and footwear',
  'cafes and restaurants',
  'beauty and medicine',
  'health',
  'transport',
  'house',
  'other',
  'продукти',
  'одяг та взуття',
  'кафе та ресторани',
  'краса та медицина',
  "здоров'я",
  'транспорт',
  'будинок',
  'інші',
];

const addTransactions = Joi.object({
  category: Joi.string().valid(...availableCategories),
  date: Joi.string(),
  comment: Joi.string().max(80),
  categoryType: Joi.string()
    .valid(...category)
    .required(),
  sum: Joi.number().required(),
});

module.exports = { addTransactions };
