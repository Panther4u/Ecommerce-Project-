const GoogleStrategy = require('passport-google-token').Strategy;
const User = require('../model/User');

module.exports = (passport) => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ email: profile.emails[0].value });
      if (user) {
        return done(null, user);
      }
      user = new User({
        username: profile.displayName,
        email: profile.emails[0].value,
        password: '', // Password not needed for Google auth users
        mobileNumber: '', // Add other required fields if needed
      });
      await user.save();
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  }));
};
