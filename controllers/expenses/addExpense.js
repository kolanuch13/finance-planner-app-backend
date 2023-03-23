const { Transaction } = require('../../models/transactions');
const { requestError } = require('../../helpers');
// const { schemasTransactions } = require('../../schemas/transactions');

const addExpense = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Transaction.create({
    ...req.body,
    date: new Date().toLocaleString(),
    owner,
  });
  // if (!result) {
  //   throw RequestError(400, "missing required name field");
  // }

  if (!result) {
    throw requestError(401);
  }
  res.status(201).json(result);
};

module.exports = addExpense;
