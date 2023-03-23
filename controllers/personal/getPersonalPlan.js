const { Personal } = require('../../models/personal');
const getPersonalPlan = async (req, res) => {
  const { _id: owner } = req.user;
  console.log(req.user._id);
  const user = await Personal.find({ owner });
  res.status(200).json(user);
};

module.exports = getPersonalPlan;
