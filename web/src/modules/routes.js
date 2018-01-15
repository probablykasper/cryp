"use strict";
const passport = require("passport");
const logErr = require("./common").logErr;
const scope = {scope: ["profile"]};
const User = require("./mongoose-models").User;

function render(app, res, pugFile, variables, callback) {
    app.render(pugFile, variables, (err, html) => {
        if (err) {
            callback(err);
        } else {
            variables.pageHTML = html;
            res.render("template", variables);
        }
    });
}

function jsonRes(res, one, two) {
    let resObj = {};
    if (one == "err") {
        resObj = {
            err: {
                code: null,
                msg: null
            }
        };
    } else if (one) {
        resObj = one;
    }
    res.json(resObj);
}

module.exports = (app) => {
    app.all("*", (req, res, next) => {
        if (req.user) {
            res.locals.loggedIn = true;
            res.locals.displayName = req.user.displayName;
            res.locals.userID = req.user._id;
            res.locals.transactions = req.transactions;
        }
        else {
            res.locals.loggedIn = false;
        }
        next();
    });

    function get(path, pugFile, variables) {
        if (typeof variables === "undefined") variables = {};
        let loggedOutPugFile;
        if (typeof variables === "string") {
            loggedOutPugFile = variables;
            variables = {};
        } else {
            loggedOutPugFile = pugFile;
        }
        app.get(path, (req, res) => {
            function render(file, callback) {
                app.render(file, variables, (err, html) => {
                    if (err) {
                        callback(err);
                    } else {
                        variables.pageHTML = html;
                        res.render("template", variables);
                    }
                });
            }

            variables.page = pugFile;
            variables.loggedIn = res.locals.loggedIn;
            if (res.locals.loggedIn) {
                variables.displayName = req.user.displayName;
                variables.profilePictureURL = req.user.profilePictureURL;
                variables.transactions = req.user.transactions;
                render("logged-in/"+pugFile, (err) => {
                    logErr(1, err);
                    render("logged-out/"+loggedOutPugFile, (err) => {
                        logErr(2, err);
                    });
                });
            } else {
                render("logged-out/"+loggedOutPugFile, (err) => {
                    logErr(3, err);
                });
            }

        });
    }

    app.get("/login", passport.authenticate("google", scope));

    app.get("/auth/google/callback", passport.authenticate("google"), (req, res) => {
        res.redirect("/");
    });

    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });

    get("/", "overview", "home");

    get("/balance", "balance");
    get("/gains", "gains");

    get("/transactions", "transactions");

    app.post("/update-transactions", (req, res) => {
        if (typeof req.body == "object") {
            User.findOneAndUpdate({
                _id: res.locals.userID
            }, {
                $set: {
                    transactions: req.body
                }
            }, {
                upsert: true
            }, (err, updatedUser) => {
                console.log(err);
                jsonRes(res);
            });
        }
    });

}
