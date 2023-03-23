const express = require("express");

const router = express.Router();
const { dateSchema } = require("../../schemas/dynamics");
const controllers = require("../../controllers/dynamics");
const { controllerWrapper } = require("../../helpers");
const { validateBody } = require("../../middlewares");

router.get("/chart", controllerWrapper(controllers.chartInfo));

router.get(
  "/statistic",
  validateBody(dateSchema),
  controllerWrapper(controllers.statisticInfo)
);

module.exports = router;
