const express = require('express');

const router = express.Router();
// const { dateSchema } = require('../../schemas/dynamics');
const controllers = require('../../controllers/dynamics');
const { controllerWrapper } = require('../../helpers');
const {
  // validateBody,
  uploadCloud,
  authenticate,
} = require('../../middlewares');

router.get('/chart', authenticate, controllerWrapper(controllers.chartInfo));

router.post(
  '/statistic',
  authenticate,
  // validateBody(dateSchema),
  controllerWrapper(controllers.statisticInfo)
);

router.get(
  '/flatImage',
  authenticate,
  // uploadCloud.single('flatImage'),
  controllerWrapper(controllers.addFlatImage)
);

router.patch(
  '/flatImage',
  authenticate,
  uploadCloud.single('flatImage'),
  controllerWrapper(controllers.changeFlatImage)
);

module.exports = router;
