const { Personal } = require('../../models/personal');
const getPersonalPlan = async (req, res) => {
  const { _id: owner } = req.user;
  const user = await Personal.findOne({ owner });
  res.status(200).json(user);
};

module.exports = getPersonalPlan;
