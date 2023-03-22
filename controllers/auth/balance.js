const { User } = require("../../models/users");
const { requestError } = require("../../helpers");
const { updateBalanceSchema } = require("../../schemas/auth");

const balance = async (req, res) => {
  const { email } = req.user;
  const { error } = updateBalanceSchema.validate(req.body);
  if (error) {
    throw requestError(400, error.message);
  }

  const result = await User.findOneAndUpdate(
    { email },
    { balance: req.body.balance },
    {
      new: true,
    }
  );
  if (!result) {
    throw requestError(401);
  }

  res.json({
    balance: result.balance,
  });
};

module.exports = balance;
