const Joi = require("joi");

const availableCategories = [
  "products",
  "clothing and footwear",
  "cafes and restaurants",
  "beauty and medicine",
  "health",
  "transport",
  "house",
  "other",
]; // були б в одному файлі схеми - було б краще, а так мушу продублювати. Прийдеться винести цей масив із цього файлу та файлу transactions із schema в якусь окрему папку, щоб не повторюватись

const addExpense = Joi.object({
  category: Joi.string()
    .valid(...availableCategories)
    .required(),
  comment: Joi.string().required(),
  sum: Joi.string().required(),
});
// стосовно даних з from account - я думаю, що цю суму потрібно забирати, тому ми передаємо тільки тип категорії, коментар та суму

const schemas = {
  addExpense,
};

module.exports = { schemas };
