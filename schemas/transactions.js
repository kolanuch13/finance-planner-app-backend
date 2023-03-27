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
]; // були б в одному файлі схеми - було б краще, а так мушу продублювати. Прийдеться винести цей масив із цього файлу та файлу transactions із schema в якусь окрему папку, щоб не повторюватись

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

const schemasTransactions = {
  addTransactions,
};

module.exports = { schemasTransactions };
