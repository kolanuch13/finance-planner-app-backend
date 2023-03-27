const express = require('express');
const app = express();
app.use(express.json());

const personalPlan = async (req, res) => {
  const { salary, passiveIncome, savings, cost, procent } = req.body;
  const numberOfMonths =
    (cost - savings) / ((salary + passiveIncome) * (procent / 100));
  const totalMonths = Math.floor(numberOfMonths);

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const result = {
    years: years,
    months: months,
  };

  res.json(result);
};

module.exports = personalPlan;
