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
  comment: Joi.string(),
  categoryType: Joi.string()
    .valid(...category)
    .required(),
  sum: Joi.number().required(),
});
// стосовно даних з from account - я думаю, що цю суму потрібно забирати, тому ми передаємо тільки тип категорії, коментар та суму

module.exports = { addTransactions };
