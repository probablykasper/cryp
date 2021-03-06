"use strict";
const express = require("express");
const fs = require("fs");
global.dir = (dirPath) => {
    return require("path").resolve(__dirname, dirPath);
}
global.logErr = require("./node/log-err.js");

const PORT_INSECURE = process.env.PORT_INSECURE;
const PORT_SECURE = process.env.PORT_SECURE;
// http
(() => {

    const http = require("http");
    const server = http.createServer();

    server.on("request", require("redirect-https")({
        port: PORT_SECURE,
        body: "<!-- Please use HTTPS instead. That's a \"you don't have a choice\", not a \"please\". -->"
    }));

    server.listen(PORT_INSECURE, () => {
        console.log();
    });

    // const httpApp = express();
    //
    // httpApp.use("/", require("redirect-https"))({
    //     body: "<!-- Please use HTTPS instead. That's a \"you don't have a choice\", not a \"please\". -->"
    // });
    //
    // httpApp.get("/", function (req, res) {
    //     console.log("user http");
    //     res.send("You found the HTTP server");
    // });
    //
    // require("http").createServer(httpApp).listen(80, () => {
    //     console.log("httpApp listening on port "+80);
    // });

})();

// https
(() => {

    const app = express();

    // load view engine
    app.set("views", dir("pug"));
    app.set("view engine", "pug");

    // static content
    app.use("/", express.static(dir("static"), { redirect: false }));
    app.use("/", express.static(dir("static/favicon"), { redirect: false }));

    const bodyParser = require("body-parser");
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

    // candlestick
    require("./node/candlestick");

    // routes
    require("./node/routes")(app);

    const httpsOptions = {
        key: fs.readFileSync(dir(`letsencrypt/etc/letsencrypt/live/${process.env.CERT_DOMAIN}/privkey.pem`)),
        cert: fs.readFileSync(dir(`letsencrypt/etc/letsencrypt/live/${process.env.CERT_DOMAIN}/cert.pem`))
    };
    require("https").createServer(httpsOptions, app).listen(443, () => {
        console.log("app listening on port "+443);
    });

})();
