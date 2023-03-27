const { Transaction } = require('../../models/transactions');
const { User } = require('../../models/users');
const { requestError } = require('../../helpers');

const addExpense = async (req, res) => {
  const { _id: owner, balance } = req.user;

  const result = await Transaction.create({
    ...req.body,
    date: new Date().toISOString(),
    owner,
  });

  if (!result) {
    throw requestError(401);
  }

  if (result) {
    const balanceUpdate =
      result.categoryType === 'income'
        ? Number(balance) + Number(result.sum)
        : Number(balance) - Number(result.sum);

    await User.findByIdAndUpdate(
      owner,
      {
        balance: balanceUpdate,
      },
      { new: true }
    );
  }

  res.status(201).json(result);
};

module.exports = addExpense;
