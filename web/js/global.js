// http://mikemcl.github.io/big.js/
"use strict";
window.cryp = {
    cryptoTickers: [], // for charts
    cryptoTickersString: "",

    cryptoBalances: [], // for charts
    cryptoBalancesPrimary: [],

    portfolioValue: new Big("0"),

    tradeCount: new Big("0"),

    primaryCurrency: "NOK",

    fiats: {
        NOK: {
            invested: new Big("0"),
            hedged: new Big("0"),
        }
    },
    cryptos: {}
};
$(document).ready(() => {

    require("./common");
    require("./ui");
    if (loggedIn) {
        require("./calculate");
        require("./crypto_compare_fetch").fetched((res) => {
            require("./calculate_crypto_compare").calculate(res);
            require("./add_values");
        });
    }
    // require("./old_global");

    console.log(cryp);
});
