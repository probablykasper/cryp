// native modules
const fs = require("fs");

module.exports = (keyPath, certPath, callback) => {

    function getCert() {
        fs.readFile(keyPath, (err, keyData) => {
            if (err) {
                console.log(`error reading TLS key (${keyPath}), retrying...`);
            } else {
                fs.readFile(certPath, (err, certData) => {
                    if (err) {
                        console.log(`error reading TLS cert (${certPath}), retrying...`);
                    } else {
                        success();
                    }
                });
            }
        });
    }

    getCert();
    const getCertInterval = setInterval(getCert, 2000);
    function success() {
        clearInterval(getCertInterval);
        callback();
    }

}
