const bcrypt = require('bcryptjs');
const { User } = require('../../models/users');
require('dotenv').config();

const { requestError } = require('../../helpers');
const { nanoid } = require('nanoid');
const sendMail = require('../../helpers/sendMail');
const { emailTemplate } = require('../../helpers');
// const { BASE_URL } = process.env;
const { FRONTEND_URL } = process.env;

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw requestError(409, 'Email in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();
  const result = await User.create({
    name,
    email,
    password: hashPassword,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: 'Finance-planner-app',
    html: emailTemplate(FRONTEND_URL, verificationToken),
  };

  await sendMail(mail);

  res.status(201).json({
    _id: result._id,
    name: result.name,
    email: result.email,
  });
};

module.exports = register;
