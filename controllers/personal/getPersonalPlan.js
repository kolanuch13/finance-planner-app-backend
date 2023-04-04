const { Personal } = require('../../models/personal');
const { requestError } = require('../../helpers');
const getPersonalPlan = async (req, res) => {
  const { _id: owner } = req.user;
  const user = await Personal.findOne({ owner });
  if (!user) {
    throw requestError(404, 'User not found');
  }
  res.status(200).json(user);
};

module.exports = getPersonalPlan;
