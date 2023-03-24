const express = require('express');
const controllers = require('../../controllers/statistics');
const controllerWrapper = require('../../helpers/controllerWrapper');
const { authenticate } = require('../../middlewares');

const router = express.Router();

router.get(
  '/by-category',
  authenticate,
  controllerWrapper(controllers.categoryTypeStatistic)
);

router.get(
  '/by-expense',
  authenticate,
  controllerWrapper(controllers.expenseStatistic)
);

module.exports = router;
// P.S. categoryTypeStatistic = by-expense: 'products', 'clothing and footwear', 'cafes and restaurants', 'beauty and medicine', 'health', 'transport', 'house', 'other'
// P.S. categoryStatistic = by-category: 'expense', 'income'
