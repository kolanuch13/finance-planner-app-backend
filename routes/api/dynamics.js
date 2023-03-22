const express = require("express");

const router = express.Router();
const schema = require("../../schemas/dynamics");
const controllers = require("../../controllers/dynamics");

router.get("/");

module.exports = router;
