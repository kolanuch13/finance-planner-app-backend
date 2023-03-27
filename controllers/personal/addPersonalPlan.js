const { Personal } = require('../../models/personal');

const addPersonalPlan = async (req, res) => {
  const { salary, passiveIncome, savings, cost, procent, footage } = req.body;
  const { _id: owner } = req.user;
  const result = await Personal.create({
    salary,
    passiveIncome,
    savings,
    cost,
    procent,
    footage,
    owner,
  });

  res.status(201).json({
    salary: result.salary,
    passiveIncome: result.passiveIncome,
    savings: result.savings,
    cost: result.cost,
    procent: result.procent,
    footage: result.footage,
  });
};
module.exports = addPersonalPlan;
