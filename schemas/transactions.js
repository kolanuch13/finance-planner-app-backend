const Joi = require('joi');

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
  comment: Joi.string(),
  sum: Joi.string().required(),
});
// стосовно даних з from account - я думаю, що цю суму потрібно забирати, тому ми передаємо тільки тип категорії, коментар та суму

const schemasTransactions = {
  addTransactions,
};

module.exports = { schemasTransactions };
