const { Personal } = require('../../models/personal');

const updatePersonalPlan = async (req, res) => {
  const { salary, passiveIncome, savings, cost, procent, footage } = req.body;
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
    },
    { new: true }
  );
  res.json(result);
};

module.exports = updatePersonalPlan;
