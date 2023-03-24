const validateBody = require('./validateBody');
const uploadCloud = require('./uploadMiddleware');
const authenticate = require('./authenticate');

module.exports = { validateBody, authenticate, uploadCloud };
