const { DateTime } = require('luxon');
const moment = require('moment');

const { User } = require('../../models/users');
const { Transaction } = require('../../models/transactions');
const { Personal } = require('../../models/personal');

const { requestError } = require('../../helpers');
const monthsName = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

async function chartInfo(req, res) {
  const { _id } = req.user;

  // last year information

  const startDate = DateTime.now()
    .setZone('America/New_York')
    .minus({ years: 1 })
    .toISO();

  const startPoint = new Date(moment(startDate.slice(0, 7)).startOf('month'));

  const data = await Transaction.aggregate([
    {
      $match: {
        owner: _id,
        createdAt: {
          $gte: startPoint,
          $lt: new Date(),
        },
      },
    },

    {
      $group: {
        _id: {
          $dateToString: {
            format: '%Y-%m',
            date: '$createdAt',
          },
        },
        expense: {
          $sum: {
            $cond: [{ $eq: ['$categoryType', 'expense'] }, '$sum', 0],
          },
        },
        income: {
          $sum: {
            $cond: [{ $eq: ['$categoryType', 'income'] }, '$sum', 0],
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        month: { $substr: ['$_id', 5, 2] },
        expense: 1,
        income: 1,
      },
    },

    {
      $sort: { month: 1 },
    },
  ]);

  const lastYearInfo = data.map(i => ({
    month: monthsName[parseInt(i.month) - 1],
    expense: i.expense,
    income: i.income,
    acumulated: i.income - i.expense,
  }));

  // how much time is left

  const {
    years: planYears,
    months: planMonths,
    createdAt,
  } = await Personal.findOne({
    owner: _id,
  });

  if (!planYears || !planMonths || !createdAt) {
    throw requestError(404);
  }

  const dateOfStart = new DateTime(createdAt);
  const endDate = dateOfStart.plus({ years: planYears, months: planMonths });
  const today = DateTime.local();
  const remainingTime = endDate.diff(today, ['years', 'months']).toObject();
  // acumulated in %

  const user = await User.findById(_id);
  if (!user) {
    throw requestError(404);
  }

  const { cost, footage, imageURL } = await Personal.findOne({ owner: _id });
  if (!cost || !footage) {
    throw requestError(404);
  }

  const acumulatedAsPercentage = (user.balance / cost) * 100;

  // acumulated squard meters

  const costOfOneMeter = cost / footage;
  const acumulatedSqMetersRounded = Math.floor(user.balance / costOfOneMeter);

  // left acumulate money to one meter

  const acumulatedSqMeter = user.balance / costOfOneMeter;

  const leftAcumulatedSqMeter = acumulatedSqMeter % 1;
  let leftAcumulatedMoneyToMeter = Math.round(
    costOfOneMeter * leftAcumulatedSqMeter
  );

  if (leftAcumulatedSqMeter === 0) {
    leftAcumulatedMoneyToMeter = costOfOneMeter;
  }

  res.json({
    lastYearInfo,
    timeIsLeft: {
      years: Math.round(remainingTime.years),
      months: Math.round(remainingTime.months),
    },

    acumulatedAsPercentage: Math.round(acumulatedAsPercentage),
    acumulatedMoney: user.balance,
    acumulatedSqMeters: acumulatedSqMetersRounded,
    leftAcumulatedMoneyToMeter,
    imageURL,
  });
}

module.exports = chartInfo;
