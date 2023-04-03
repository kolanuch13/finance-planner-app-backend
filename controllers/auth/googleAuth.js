const { User } = require('../../models/users');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { SECRET_KEY, FRONTEND_URL } = process.env;

const googleAuth = async (req, res) => {
  const { _id: id } = req.user;
  const payload = {
    id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' });

  await User.findByIdAndUpdate(id, { token });

  res.redirect(
    `${FRONTEND_URL}?email=${req.user.email}&password=${req.user.password}`
  );
};

module.exports = googleAuth;
