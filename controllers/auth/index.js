const register = require('./register');
const verify = require('./verify');
const resendEmail = require('./resendEmail');
const login = require('./login');
const logout = require('./logout');
const balance = require('./balance');
const current = require('./current');
const googleAuth = require('./googleAuth');

module.exports = {
  register,
  verify,
  resendEmail,
  login,
  logout,
  balance,
  current,
  googleAuth,
};
