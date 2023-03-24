const { Personal } = require('../../models/personal');
const { requestError } = require('../../helpers');
const moment = require('moment');

const dayLimitInfo = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Personal.find(
    { owner },
    'salary passiveIncome procent'
  ).populate('owner', 'email');

  if (!result) {
    throw requestError(401);
  }

  const { salary, passiveIncome, procent } = result[0];

  const data = moment().format('YYYY-MM');
  const daysInMonth = moment(data, 'YYYY-MM').daysInMonth();

  const limitDay = (
    (Number(salary) +
      Number(passiveIncome) -
      (Number(salary) + Number(passiveIncome)) * (Number(procent) / 100)) /
    Number(daysInMonth)
  ).toFixed(2);

  const limitMonth = (
    Number(salary) +
    Number(passiveIncome) -
    (Number(salary) + Number(passiveIncome)) * (Number(procent) / 100)
  ).toFixed(2);

  const limitInfo = {
    limitDay,
    limitMonth,
  };

  res.json(limitInfo);
};

module.exports = dayLimitInfo;
