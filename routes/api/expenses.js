const express = require('express');
const controllers = require('../../controllers/expenses/');
const controllerWrapper = require('../../helpers/controllerWrapper');
const { validateBody, authenticate } = require('../../middlewares');
const { schemasTransactions } = require('../../schemas/transactions');

const router = express.Router();

router.get('/category', controllerWrapper(controllers.getCategory));

router.get(
  '/dayLimit',
  // authenticate,
  controllerWrapper(controllers.dayLimitInfo)
);

router.post(
  '/expense',
  authenticate,
  validateBody(schemasTransactions.addTransactions),
  controllerWrapper(controllers.addExpense)
);

router.patch(
  '/expense',
  // authenticate,
  validateBody(schemasTransactions),
  controllerWrapper(controllers.editExpense)
);

router.delete(
  '/expense',
  // authenticate,
  validateBody(schemasTransactions),
  controllerWrapper(controllers.removeExpense)
);

module.exports = router;
