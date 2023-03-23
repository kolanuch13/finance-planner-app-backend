const { User } = require("../../models/users");
const { requestError } = require("../../helpers");

const logout = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findById(_id);
  if (!user) {
    throw requestError(401);
  }
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({
    message: "Logout success",
  });
};

module.exports = logout;
