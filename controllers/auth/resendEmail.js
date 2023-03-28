const { User } = require('../../models/users');
const { requestError } = require('../../helpers');
const { sendMail } = require('../../helpers/');
require('dotenv').config();
const { BASE_URL } = process.env;

const resendEmail = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const user = await User.findOne({ email });
  console.log(user);

  if (!user || user.verify) {
    throw requestError(404);
  }

  const mail = {
    to: email,
    subject: 'Verify email bro:))',
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click to verify your email</a>`,
  };

  await sendMail(mail);

  res.json({
    message: 'Mail was send successfully',
  });
};

module.exports = resendEmail;
