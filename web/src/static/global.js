$(document).ready(() => {



// https://github.com/MikeMcl/big.js
"use strict";

(function commonFunctions() {
    window.loopObject = (object, callback) => {
        for (let key in object) {
            // skip loop if the property is from prototype
            if (!object.hasOwnProperty(key)) continue;

            callback(object, key);
        }
    }
})();
(function ui() {
    if (loggedIn) {
        $("header.site-header img.account-icon").on("click", () => {
            $("header.site-header .account-box").toggleClass("visible");
        });
        $(document).on("click", (e) => {
            if (!$(e.target).parents("div.account-icon").length) {
                $("header.site-header .account-box").removeClass("visible");
            }
        });
    }
    let tooltipTimeout;
    $(".tooltip-area").on({
        mouseenter: (e) => {
            tooltipTimeout = setTimeout(() => {
                $(e.delegateTarget).children(".tooltip").addClass("visible");
            }, 500)
        },
        mouseleave: (e) => {
            clearTimeout(tooltipTimeout);
            $(e.delegateTarget).children(".tooltip").removeClass("visible");
        }
    })
})();

const primaryCurrency = "NOK";
window.transactions = [
    {
        type: "fiatTrade",
        buy: {
            amount: "0.04073887",
            currency: "BTC"
        },
        sell: {
            amount: "932.03",
            currency: "NOK"
        },
        // fee: [],
        exchange: "Bittrex",
        group: "",
        note: "via Anycoin Direct",
        date: new Date("2017-07-25 11:04:48")
    },
    {
        type: "trade",
        buy: {
            amount: "6120.03355798",
            currency: "SC"
        },
        sell: {
            amount: "0.02006253",
            currency: "BTC"
        },
        fee: {
            amount: "0.00005003",
            currency: "BTC"
        },
        exchange: "Bittrex",
        group: "",
        note: "",
        date: new Date("2017-07-27 21:49:53")
    },
    {
        type: "moveExchange",
        amount: {
            amount: "100",
            currency: "SC"
        },
        fee: {
            amount: "0.1",
            currency: "SC"
        },
        fromExchange: "Bittrex",
        toExchange: "SC Wallet",
        group: "",
        note: "",
        date: new Date("2017-07-27 22:00:55")
    },
    {
        type: "fiatTrade",
        buy: {
            amount: "300",
            currency: "NOK"
        },
        sell: {
            amount: "0.01073887",
            currency: "BTC"
        },
        // fee: [],
        exchange: "Bittrex",
        group: "",
        note: "via Anycoin Direct",
        date: new Date("2017-07-28 11:00:00")
    }
];

if (loggedIn) cryptoCalculations();
function cryptoCalculations() {
    let fiats = {
        NOK: {
            invested: new Big("0"),
            hedged: new Big("0")
        },
        EUR: {
            invested: new Big("0"),
            hedged: new Big("0")
        }
    };
    let cryptos = {};
    function addCryptoIfNew(crypto) {
        if (fiats[crypto] === undefined) {
            if (cryptos[crypto] === undefined) {
                cryptos[crypto] = {
                    balance: new Big("0")
                };
            }
        }
    }
    let tradeCount = 0;
    for (let i = 0; i < transactions.length; i++) {

        const transaction = transactions[i];
        const type = transaction.type;

        const buy = transaction.buy;
        if (buy !== undefined) {
            addCryptoIfNew(buy.currency);
            if (cryptos[buy.currency] === undefined) {
                // buying fiat
                const hedged = fiats[buy.currency].hedged;
                fiats[buy.currency].hedged = hedged.plus(buy.amount);
            } else {
                // buying crypto
                const balance = cryptos[buy.currency].balance;
                cryptos[buy.currency].balance = balance.plus(buy.amount);
            }
        }
        const sell = transaction.sell;
        if (sell !== undefined) {
            addCryptoIfNew(sell.currency);
            if (cryptos[sell.currency] === undefined) {
                // selling fiat
                const invested = fiats[sell.currency].invested;
                fiats[sell.currency].invested = invested.plus(sell.amount);
            } else {
                // selling crypto
                const balance = cryptos[sell.currency].balance;
                cryptos[sell.currency].balance = balance.minus(sell.amount);
            }
        }
        const fee = transaction.fee;
        if (fee !== undefined) {
            addCryptoIfNew(fee.currency);
        }
        const amount = transaction.amount;
        if (amount !== undefined) {
            addCryptoIfNew(amount.currency);
        }

        // if (type == "fiatTrade") {
        //
        // } else if (type == "trade") {
        //
        // } else if (type == "moveExchange") {
        //
        // } else if (type == "Fork") {
        //
        // } else if (type == "Gift / Tip") {
        //
        // }
        if (type != "moveExchange") tradeCount++;
    }

    loopObject(fiats, (fiats, fiat) => {
        fiats[fiat].invested = fiats[fiat].invested.toString();
        if (
            (page == "home" && fiats[fiat].invested > 0)
            || fiat == primaryCurrency
        ) {
            $(".total-fiat-invested .card-container")
                .append(`<p>${fiats[fiat].invested} ${fiat}</p>`);
            $(".total-fiat-hedged .card-container")
                .append(`<p>${fiats[fiat].hedged} ${fiat}</p>`);
        }
    });
    $(".total-trades .card-container")
        .append(`<p>${tradeCount}</p>`);

    loopObject(cryptos, (cryptos, crypto) => {
        cryptos[crypto].balance = cryptos[crypto].balance.toString();
    });

    console.log(fiats);
    console.log(cryptos);
}



});
