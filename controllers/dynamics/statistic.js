const { requestError } = require('../../helpers');
const { Transaction } = require('../../models/transactions');
const { Personal } = require('../../models/personal');

async function statisticInfo(req, res) {
  const { _id } = req.user;

  const { month, year } = req.body;

  // incomes for the selected month
  const result = await Transaction.aggregate([
    {
      $facet: {
        income: [
          {
            $match: {
              $and: [
                { owner: _id },
                { categoryType: 'income' },
                {
                  $expr: {
                    $eq: [{ $month: '$createdAt' }, month],
                  },
                },
                {
                  $expr: {
                    $eq: [{ $year: '$createdAt' }, year],
                  },
                },
              ],
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: { $toDouble: '$sum' } },
            },
          },
          {
            $project: {
              _id: 0,
              income: '$total',
            },
          },
        ],
        expense: [
          {
            $match: {
              $and: [
                { owner: _id },
                { categoryType: 'expense' },
                {
                  $expr: {
                    $eq: [{ $month: '$createdAt' }, month],
                  },
                },
                {
                  $expr: {
                    $eq: [{ $year: '$createdAt' }, year],
                  },
                },
              ],
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: { $toDouble: '$sum' } },
            },
          },
          {
            $project: {
              _id: 0,
              expense: '$total',
            },
          },
        ],
      },
    },
    {
      $project: {
        _id: 0,
        income: { $arrayElemAt: ['$income', 0] },
        expense: { $arrayElemAt: ['$expense', 0] },
      },
    },
  ]);

  const {
    income: incomeSumPerSelectedMonth,
    expense: expenseSumPerSelectedMonth,
  } = result[0];

  // acumulated for the selected month
  const acumulatedSumPerSelectedMonth =
    incomeSumPerSelectedMonth?.income - expenseSumPerSelectedMonth?.expense;

  // plan money per month

  const { passiveIncome, salary, procent } = await Personal.findOne({
    owner: _id,
  });
  if (!passiveIncome || !salary || !procent) {
    throw requestError(404);
  }
  const planMoneyPerMonth = ((salary + passiveIncome) * procent) / 100;

  // plan percentage per month

  const percentagePlanPerMonth =
    (acumulatedSumPerSelectedMonth / planMoneyPerMonth) * 100;

  res.json({
    incomeSumPerSelectedMonth: incomeSumPerSelectedMonth?.income,
    expenseSumPerSelectedMonth: expenseSumPerSelectedMonth?.expense,
    acumulatedSumPerSelectedMonth,
    planMoneyPerMonth,
    percentagePlanPerMonth: Math.round(percentagePlanPerMonth),
  });
}

module.exports = statisticInfo;
