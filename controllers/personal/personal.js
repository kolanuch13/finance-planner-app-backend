const express = require('express');
const app = express();
app.use(express.json());

const personalPlan = async (req, res) => {
  const {
    salary,
    passiveIncome,
    savings,
    cost,
    procent,
    // footage,
    // year,
    // month,
    // owner,
  } = await req.body;

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

const updatePersonalPlan = async (req, res) => {
  const {
    salary,
    passiveIncome,
    savings,
    cost,
    procent,
    footage,
    // year,
    // month,
    owner,
  } = req.body;

  const result = await personalPlan.findOneAndUpdate(
    { owner: owner },
    {
      salary: salary,
      passiveIncome: passiveIncome,
      savings: savings,
      cost: cost,
      footage: footage,
      procent: procent,
    },
    { new: true }
  );

  if (!result) {
    return res.status(404).json({ message: 'Запис не знайдено' });
  }

  res.json(personalPlan);
};
const Personal = { personalPlan, updatePersonalPlan };
module.exports = Personal;
