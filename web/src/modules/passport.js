const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
let callbackURL = process.env.PROD_URL;
if (process.env.ENV == "dev") callbackURL = "http://localhost";
passport.use(new GoogleStrategy({
        clientID: "98910954867-l9ac0hp7tns2idkj1at9ft0m21t21iqh.apps.googleusercontent.com",
        clientSecret: "7IOTjZJW7GKDig8uYzrFaQKl",
        callbackURL: callbackURL+"/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
       User.findOrCreate({ googleId: profile.id }, function (err, user) {
           return done(err, user);
       });
    }
));

module.exports = () => {
    app.use(passport.initialize());
};
