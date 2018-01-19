"use strict";
// modules
const bodyParser = require("body-parser");
// express
const express = require("express");
const app = express();
// dir function
const path = require("path");
global.dir = (dirPath) => {
    return require("path").resolve(__dirname, dirPath);
}

// load view engine
// app.set("views", require("path").resolve(__dirname, "pug"));
app.set("views", dir("pug"));
app.set("view engine", "pug");

// static content
app.use("/", express.static(dir("static"), { redirect: false }));
app.use("/", express.static(dir("static/favicon"), { redirect: false }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json({ type: "application/json" }));

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
const passportSetup = require("./node/passport-setup");
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
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// routes
require("./node/routes")(app);

// start server
const server = app.listen(80, () => {
    console.log("Express server listening on 80");
});
