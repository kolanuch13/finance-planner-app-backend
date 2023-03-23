const { User } = require("../../models/users");
const { requestError } = require("../../helpers");

const current = async (req, res) => {
  const { email } = req.user;
  const user = await User.findOne({ email });

  if (!user) {
    throw requestError(401);
  }

  res.json({
    user: user,
  });
};

module.exports = current;
