const { Transaction } = require('../../models/transactions');
const { requestError } = require('../../helpers');
const moment = require('moment');

const categoryTypeStatistic = async (req, res) => {
  const { _id } = req.user;
  const { month, year } = req.query;

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
    {
      $group: {
        _id: '$category',
        totalSum: { $sum: '$sum' },
      },
    },
  ]);

  if (!result) {
    throw requestError(401);
  }

  const totalSum = result.reduce((acc, item) => acc + item.totalSum, 0);

  const percentByCategory = result.map(
    item => (item.percent = (item.totalSum / totalSum).toFixed(2) * 100)
  );

  const calculatedResult = {
    result,
    percentByCategory,
    totalSum,
  };

  res.json({
    status: 'success',
    code: 200,
    calculatedResult,
  });
};

module.exports = categoryTypeStatistic;
