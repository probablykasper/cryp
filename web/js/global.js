// http://mikemcl.github.io/big.js/
"use strict";
$(document).ready(() => {
    require("./common");
    require("./ui");
    if (loggedIn) {
        require("./calculate");
    }
    require("./old_global");
});
