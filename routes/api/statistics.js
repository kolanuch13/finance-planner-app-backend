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
