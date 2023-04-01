const passport = require('passport');
const { Strategy } = require('passport-google-oauth2');
const { User } = require('../models/users');
const bcrypt = require('bcryptjs');
const { nanoid } = require('nanoid');

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } =
  process.env;

const googleParams = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: GOOGLE_CALLBACK_URL,
  passReqToCallBack: true,
};

const googleCallback = async (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    const user = await User.findOne({ email: profile.email });
    if (user) {
      return done(null, user);
    }
    const plainPassword = nanoid();
    const hashPassword = await bcrypt.hash(plainPassword, 10);
    await User.create({
      email: profile.email,
      password: hashPassword,
      name: profile.displayName,
      verificationToken: 'verified_by_fb',
      verify: true,
    });
    done(null, { email: profile.email, password: hashPassword });
  } catch (error) {
    done(error, false);
  }
};

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

const googleStrategy = new Strategy(googleParams, googleCallback);

passport.use('google', googleStrategy);

module.exports = passport;
