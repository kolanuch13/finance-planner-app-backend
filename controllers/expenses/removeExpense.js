const { Transaction } = require('../../models/transactions');
const { requestError } = require('../../helpers');

const removeExpense = async (req, res) => {
  const { transactionId } = req.params;
  const result = await Transaction.findByIdAndRemove(transactionId);
  if (!result) {
    throw requestError(404, 'Not found');
  }
  res.status(200).json({ message: 'contact deleted' });
};

module.exports = removeExpense;
