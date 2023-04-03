const express = require('express');
const controllers = require('../../controllers/auth');
const controllerWrapper = require('../../helpers/controllerWrapper');
const { validateBody, authenticate, passport } = require('../../middlewares');
const {
  registerSchema,
  verifyEmailSchema,
  loginSchema,
} = require('../../schemas/auth');

const router = express.Router();

router.post(
  '/register',
  validateBody(registerSchema),
  controllerWrapper(controllers.register)
);

router.get('/verify/:verificationToken', controllerWrapper(controllers.verify));

router.post(
  '/verify',
  validateBody(verifyEmailSchema),
  controllerWrapper(controllers.resendEmail)
);

router.post(
  '/login',
  validateBody(loginSchema),
  controllerWrapper(controllers.login)
);

router.post('/logout', authenticate, controllerWrapper(controllers.logout));
router.patch('/balance', authenticate, controllerWrapper(controllers.balance));
router.get('/current', authenticate, controllerWrapper(controllers.current));

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
  }),
  controllerWrapper(controllers.googleAuth)
);

module.exports = router;
