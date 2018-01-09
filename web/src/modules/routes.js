"use strict";
const passport = require("passport");
const logErr = require("./common").logErr;
const scope = {scope: ["profile"]};

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

module.exports = (app) => {
    app.all("*", (req, res, next) => {
        if (req.user) {
            res.locals.loggedIn = true;
            res.locals.displayName = req.user.displayName;
            res.locals.userID = req.user._id;
        }
        else {
            res.locals.loggedIn = false;
        }
        next();
    });

    function get(path, pugFile, variables) {
        if (typeof variables === "undefined") variables = {};
        app.get(path, (req, res) => {
            function render(pugFilePrefix, callback) {
                app.render(pugFilePrefix+pugFile, variables, (err, html) => {
                    if (err) {
                        callback(err);
                    } else {
                        variables.pageHTML = html;
                        res.render("template", variables);
                    }
                });
            }

            variables.page = pugFile;
            if (res.locals.loggedIn) {
                variables.loggedIn = res.locals.loggedIn;
                variables.displayName = req.user.displayName;
                variables.profilePictureURL = req.user.profilePictureURL;
                render("logged-in/", (err) => {
                    logErr(1, err);
                    render("logged-out/", (err) => {
                        logErr(2, err);
                    });
                });
            } else {
                render("logged-out/", (err) => {
                    logErr(3, err);
                });
            }

        });
    }

    get("/", "home");

    app.get("/login", passport.authenticate("google", scope));

    app.get("/auth/google/callback", passport.authenticate("google"), (req, res) => {
        res.redirect("/");
    });

    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });

    // app.get("/login", passport.authenticate("google", {
    //     scope: ['https://www.googleapis.com/auth/plus.login']
    // }));
    //
    // app.get("/auth/google/callback", (req, res) => {
    //     res.redirect("/");
    // });

}
