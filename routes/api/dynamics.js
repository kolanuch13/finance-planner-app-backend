const express = require('express');

const router = express.Router();
const { dateSchema } = require('../../schemas/dynamics');
const controllers = require('../../controllers/dynamics');
const { controllerWrapper } = require('../../helpers');
const {
  validateBody,
  uploadCloud,
  authenticate,
} = require('../../middlewares');

router.get('/chart', authenticate, controllerWrapper(controllers.chartInfo));

router.get(
  '/statistic',
  authenticate,
  validateBody(dateSchema),
  controllerWrapper(controllers.statisticInfo)
);

router.patch(
  '/flatImage',
  authenticate,
  uploadCloud.single('flatImage'),
  controllerWrapper(controllers.flatImage)
);

module.exports = router;
