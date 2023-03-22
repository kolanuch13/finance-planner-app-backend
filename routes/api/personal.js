const express = require("express");
const router = express.Router();
const { requestError } = require("../../helpers/");

const Personal = require("../../controllers/personal/personal");

router.post("/pre", Personal.personalPlan, requestError);
router.post("/", Personal.personalPlan, requestError);
router.get("/", Personal.personalPlan, requestError);
router.put("/", Personal.updatePersonalPlan, requestError);

module.exports = router;
