const express = require('express');
const router = express.Router();
const { controllerWrapper } = require('../../helpers/');
const { personalSchema } = require('../../schemas/personal');
const Personal = require('../../controllers/personal/personal');
const addPersonalPlan = require('../../controllers/personal/addPersonalPlan');
const { validateBody, authenticate } = require('../../middlewares');

router.post('/pre', validateBody(personalSchema), Personal.personalPlan);
router.post(
  '/',
  authenticate,
  validateBody(personalSchema),
  controllerWrapper(addPersonalPlan)
);

router.get('/', Personal.personalPlan);
router.put('/', Personal.updatePersonalPlan);

module.exports = router;
