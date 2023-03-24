const { DateTime } = require('luxon');

const { User } = require('../../models/users');


const { requestError } = require('../../helpers');

async function chartInfo(req, res) {
  const { _id } = req.user;

  // last year information
  const lastYear = DateTime.now()
    .setZone('America/New_York')
    .minus({ years: 1 })
    .toISO();

  const expenses = await Transaction.aggregate([
    {
      $match: {
        owner: _id,
        type: 'expense',
        date: {
          $gte: lastYear,
          $lt: new Date(),
        },
      },
    },
    {
      $group: {
        _id: '$category',
        totalSum: { $sum: '$sum' },
      },
    },
    {
      $project: { _id: 0, category: '$_id.category', totalSum: '$totalSum' },
    },
  ]);
  if (!expenses) {
    throw requestError(404);
  }
  const incomes = await Transaction.aggregate([
    {
      $match: {
        owner: _id,
        type: 'income',
        date: {
          $gte: lastYear,
          $lt: new Date(),
        },
      },
    },
    {
      $group: {
        _id: '$category',
        totalSum: { $sum: '$sum' },
      },
    },
    {
      $project: { _id: 0, category: '$_id.category', totalSum: '$totalSum' },
    },
  ]);
  if (!incomes) {
    throw requestError(404);
  }

  // how much time is left

  const { year, month, createdAt } = await PersonalPlan.find({ owner: _id });

  if (!year || !month || !createdAt) {
    throw requestError(404);
  }
  const nowDate = new Date();
  const endDate = DateTime.fromISO(createdAt).plus({ year, month }).toISODate();

  const start = DateTime.fromISO(nowDate.toISOString());
  const end = DateTime.fromISO(endDate);

  const { years, months } = end.diff(start, ['months', 'year']).toObject();

  // acumulated in %

  const { balance } = await User.find({ owner: _id });
  if (!balance) {
    throw requestError(404);
  }

  const { cost, footage } = await PersonalPlan.find({ owner: _id });
  if (!cost || !footage) {
    throw requestError(404);
  }

  const acumulatedAsPercentage = (balance / cost) * 100;

  // acumulated squard meters

  const costOfOneMeter = cost / footage;
  const acumulatedSqMetersRounded = Math.floor(balance / costOfOneMeter);

  // left acumulate money to one meter

  const acumulatedSqMeter = balance / costOfOneMeter;

  const leftAcumulatedSqMeter = acumulatedSqMeter % 1;
  let leftAcumulatedMoneyToMeter = Math.round(
    costOfOneMeter * leftAcumulatedSqMeter
  );

  if (leftAcumulatedSqMeter === 0) {
    leftAcumulatedMoneyToMeter = costOfOneMeter;
  }

  res.json({
    lastYearInfo: {
      expenses,
      incomes,
    },
    timeIsLeft: {
      year: Math.round(years),
      month: Math.round(months),
    },
    acumulatedAsPercentage,
    acumulatedMoney: balance,
    acumulatedSqMeters: acumulatedSqMetersRounded,
    leftAcumulatedMoneyToMeter,
  });
}

module.exports = chartInfo;
