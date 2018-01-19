const express = require("express");
const http = require("http");
let server;

module.exports = {
    start: (insecurePort) => {

        const app = express();
        app.use("/", express.static(dir("static"), { redirect: false }));
        server = http.createServer(app).listen(insecurePort, () => {
            console.log("temp http server started");
        });

    },
    close: () => {

        server.close(() => {
            console.log("temp http server closed");
        });

    }
}
