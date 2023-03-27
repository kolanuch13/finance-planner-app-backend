const { Personal } = require('../../models/personal');

const updatePersonalPlan = async (req, res) => {
  const {
    salary,
    passiveIncome,
    savings,
    cost,
    procent,
    footage,
    years,
    months,
  } = req.body;
  const { _id } = req.user;
  const result = await Personal.findOneAndUpdate(
    { owner: _id },
    {
      salary: salary,
      passiveIncome: passiveIncome,
      savings: savings,
      cost: cost,
      footage: footage,
      procent: procent,
      years,
      months,
    },
    { new: true }
  );
  res.json(result);
};

module.exports = updatePersonalPlan;
