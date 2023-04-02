const availableCategoriesEn = [
  'Products',
  'Clothing and footwear',
  'Cafes and restaurants',
  'Beauty and medicine',
  'Health',
  'Transport',
  'House',
  'Other',
];

const availableCategoriesUa = [
  'Продукти',
  'Одяг та взуття',
  'Кафе та ресторани',
  'Краса та медицина',
  'Здоровя',
  'Транспорт',
  'Будинок',
  'Інші',
];

const getCategory = async (req, res) => {
  res.json({ availableCategoriesEn, availableCategoriesUa });
};

module.exports = getCategory;
