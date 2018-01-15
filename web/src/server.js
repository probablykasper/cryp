"use strict";
// // modules
// const bodyParser = require("body-parser");

// express
const express = require("express");
const app = express();

// load view engine
app.set("views", "pug");
app.set("view engine", "pug");



// start server
const server = app.listen(80, () => {
    console.log("Express server listening on 80");
});
