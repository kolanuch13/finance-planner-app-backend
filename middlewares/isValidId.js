const { isValidObjectId } = require('mongoose');

const { requestError } = require('../helpers');

const isValidId = (req, res, next) => {
  const { transactionId } = req.params;
  if (!isValidObjectId(transactionId)) {
    next(requestError(400, 'Not valid id'));
  }
  next();
};

module.exports = isValidId;
