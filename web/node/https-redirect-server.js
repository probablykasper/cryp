const http = require("http");
const redirectHTTPS = require("redirect-https");

module.exports = {
    start: (insecurePort, securePort) => {

        const server = http.createServer();

        server.on("request", redirectHTTPS({
            port: securePort,
            body: "<!-- Please use HTTPS -->",
            trustProxy: true // default is false
        }));

        server.listen(insecurePort, function () {
            console.log("http redirect server started");
        });

    }
}
