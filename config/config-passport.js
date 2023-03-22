const passport = require('passport')
const passportJWT = require('passport-jwt')
// const User = require('../service/schemas/users')
require('dotenv').config()
const secret = process.env.SECRET_KEY;

const ExtractJWT = passportJWT.ExtractJwt
const Strategy = passportJWT.Strategy
const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
}

passport.use(
  new Strategy(params, (payload, done) => {
    User.findOne({_id: payload.id}, function(err, user) {
      if (err) {
          return done(err, false);
      }
      if (user) {
          done(null, user);
      } else {
          done(null, false);
      }
    })
  })
)