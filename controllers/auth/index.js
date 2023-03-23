const register = require("./register");
const verify = require("./verify");
const resendEmail = require("./resendEmail");
const login = require("./login");
const logout = require("./logout");
const balance = require("./balance");
const current = require("./current");

module.exports = {
  register,
  verify,
  resendEmail,
  login,
  logout,
  balance,
  current,
};
