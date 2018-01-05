"use strict";
// modules
const bodyParser = require("body-parser");
// express
const express = require("express");
const app = express();
// local modules
if (process.env.ENV == "dev") require("./modules/compile")();

// load view engine
app.set("views", "pug");
app.set("view engine", "pug");

// static content
app.use("/", express.static("static", { redirect: false }));
app.use("/", express.static("static/favicon", { redirect: false }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// mongoose
const mongoose = require("mongoose");
mongoose.connect("mongodb://db/cryp");
const db = mongoose.connection;
const dbSuc = "\x1b[42m[Mongoose]\x1b[0m ";
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log(dbSuc+"connected to MongoDB");
});

// passport
const passport = require("passport");
const passportSetup = require("./modules/passport-setup");

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
app.use(session({
    // key: "sess",
    secret: "tomatonanaboy69:o",
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 60*60*24*90,
        touchAfter: 60*60*24
    }),
    resave: false,
    saveUninitialized: false//,
    // cookie: {}
}));
app.use(passport.initialize());
app.use(passport.session());
// const passport = require("passport");
// const MongoStore = require("connect-mongo")(session);
// app.use(session({
//     // key: "sess",
//     secret: "bananaboy69",
//     store: new MongoStore({
//         mongooseConnection: mongoose.connection,
//         ttl: 60*60*24*90,
//         touchAfter: 60*60*24
//     }),
//     resave: false,
//     saveUninitialized: false//,
//     // cookie: {}
// }));
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// let callbackURL = process.env.PROD_URL;
// if (process.env.ENV == "dev") callbackURL = "http://localhost";
// passport.use(new GoogleStrategy({
//     clientID: "98910954867-l9ac0hp7tns2idkj1at9ft0m21t21iqh.apps.googleusercontent.com",
//     clientSecret: "7IOTjZJW7GKDig8uYzrFaQKl",
//     callbackURL: callbackURL+"/auth/google/callback"
// }, (accessToken, refreshToken, profile, done) => {
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//         console.log("err");
//         console.log(err);
//         console.log("user");
//         console.log(user);
//         return done(err, user);
//     });
// }));

// routes
require("./modules/routes")(app);

// start server
const server = app.listen(80, () => {
    console.log("Express server listening on 80");
});
