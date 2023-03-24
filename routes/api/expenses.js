const express = require('express');
const controllers = require('../../controllers/expenses/');
const controllerWrapper = require('../../helpers/controllerWrapper');
const { validateBody, authenticate, isValidId } = require('../../middlewares');
const { schemasTransactions } = require('../../schemas/transactions');

const router = express.Router();

router.get('/category', controllerWrapper(controllers.getCategory));

router.get(
  '/dayLimit',
  authenticate,
  controllerWrapper(controllers.dayLimitInfo)
);

router.post(
  '/transaction',
  authenticate,
  validateBody(schemasTransactions.addTransactions),
  controllerWrapper(controllers.addExpense)
);

router.patch(
  '/transaction/:transactionId',
  authenticate,
  isValidId,
  validateBody(schemasTransactions.addTransactions),
  controllerWrapper(controllers.editExpense)
);

router.delete(
  '/transaction/:transactionId',
  authenticate,
  isValidId,
  controllerWrapper(controllers.removeExpense)
);

module.exports = router;
