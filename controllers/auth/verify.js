const { User } = require('../../models/users');
const { requestError } = require('../../helpers');

const verify = async (req, res) => {
  console.log(123);
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw requestError(404);
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: '',
  });

  res.json({
    message: 'Email was verified successfully',
  });
};

module.exports = verify;
