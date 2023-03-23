const availableCategories = [
  'Products',
  'Clothing and footwear',
  'Cafes and restaurants',
  'Beauty and medicine',
  'Health',
  'Transport',
  'House',
  'Other',
];

const getCategory = async (req, res) => {
  res.json(availableCategories);
};

module.exports = getCategory;
