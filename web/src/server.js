"use strict";
// native modules
const path = require("path");
// dir function
global.dir = (dirPath) => {
    return require("path").resolve(__dirname, dirPath);
}

// config
const keyPath = dir("tls/domain.key");
const certPath = dir("tls/domain.crt");
const insecurePort = process.env.CRYP_INSECURE_PORT;
const securePort = process.env.CRYP_SECURE_PORT;

const tempServer = require("./node/temp-server");
tempServer.start(insecurePort);

const getCerts = require("./node/get-certs");
getCerts(keyPath, certPath, () => {

    tempServer.close();

    // httpsRedirectServer
    const httpsRedirectServer = require("./node/https-redirect-server");
    httpsRedirectServer.start(insecurePort, securePort);



    const express = require("express");
    const app = express();

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

    // start server
    httpsOptions = {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath)
    };

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

    https.createServer(httpsOptions, app).listen(securePort, () => {
        console.log("https server started");
    });

});
