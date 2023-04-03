const { Transaction } = require('../../models/transactions');
const { requestError } = require('../../helpers');

const editExpense = async (req, res) => {
  const { transactionId } = req.params;
  const result = await Transaction.findByIdAndUpdate(transactionId, req.body, {
    new: true,
  });

  if (!result) {
    throw requestError(404, 'Not found');
  }
  res.json(result);
};

module.exports = editExpense;
