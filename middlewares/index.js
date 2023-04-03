const validateBody = require('./validateBody');
const uploadCloud = require('./uploadMiddleware');
const authenticate = require('./authenticate');
const isValidId = require('./isValidId');
const passport = require('./passport');

module.exports = {
  validateBody,
  authenticate,
  uploadCloud,
  isValidId,
  passport,
};
