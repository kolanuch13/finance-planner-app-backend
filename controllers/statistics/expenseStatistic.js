const { Transaction } = require('../../models/transactions');
const { requestError } = require('../../helpers');
const moment = require('moment');

const categoryStatistic = async (req, res) => {
  const { _id } = req.user;
  const { month, year, page = 1, limit = 6 } = req.query;
  const skip = (page - 1) * limit;

  const startPoint = moment()
    .year(year)
    .month(month - 1)
    .startOf('month')
    .format();
  const endPoint = moment()
    .year(year)
    .month(month - 1)
    .endOf('month')
    .format();

  const totalTransactions = await Transaction.aggregate([
    {
      $match: {
        owner: _id,
        categoryType: 'expense',
        date: {
          $gte: startPoint,
          $lt: endPoint,
        },
      },
    },
  ]);

  const result = await Transaction.aggregate([
    {
      $match: {
        owner: _id,
        categoryType: 'expense',
        date: {
          $gte: startPoint,
          $lt: endPoint,
        },
      },
    },
    { $sort: { date: -1 } },
    { $skip: skip },
    { $limit: Number(limit) },
  ]);

  if (!result) {
    throw requestError(401);
  }

  res.json({
    status: 'success',
    code: 200,
    result: {
      transactions: result,
      totalTransactions: totalTransactions.length,
    },
  });
};

module.exports = categoryStatistic;
