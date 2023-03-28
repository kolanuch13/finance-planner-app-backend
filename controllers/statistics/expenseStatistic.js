const { Transaction } = require('../../models/transactions');
const { requestError } = require('../../helpers');
const moment = require('moment');

const categoryStatistic = async (req, res) => {
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
  ]);

  if (!result) {
    throw requestError(401);
  }

  res.json({
    status: 'success',
    code: 200,
    result,
  });
};

module.exports = categoryStatistic;
