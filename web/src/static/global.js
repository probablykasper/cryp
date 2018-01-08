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
window.exampleee = {
    type: "",
    buy: {
        amount: 0,
        currency: ""
    },
    sell: {
        amount: 0,
        currency: ""
    },
    fee: [],
    exchange: "",
    group: "",
    note: "",
    date: new Date("")
}
window.transactions = [
    {
        type: "fiatBuy",
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
    }
];

let fiats = {
    NOK: {
        invested: new Big("0")
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
for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];
    const type = transaction.type;

    const buy = transaction.buy;
    if (buy !== undefined) {
        addCryptoIfNew(buy.currency);
        if (cryptos[buy.currency] === undefined) {
            // fiats[buy.currency].invested += buy.amount;
            fiats[buy.currency].invested.add(buy.amount);
        } else {
            // cryptos[buy.currency].balance += buy.amount;
            cryptos[buy.currency].balance.add(buy.amount);
            // Big(0.04073887).sub(Big(0.02006253))
        }
    }
    const sell = transaction.sell;
    if (sell !== undefined) {
        addCryptoIfNew(sell.currency);
        if (cryptos[sell.currency] === undefined) {
            // fiats[sell.currency].invested -= sell.amount;
            fiats[sell.currency].invested.sub(sell.amount);
        } else {
            // cryptos[sell.currency].balance -= sell.amount;
            cryptos[sell.currency].balance.sub(sell.amount);
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

    // if (type == "fiatBuy") {
    //
    // } else if (type == "fiatSell") {
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
}

loopObject(fiats, (fiats, fiat) => {
    fiats[fiat].invested = fiats[fiat].invested.toString();
});

loopObject(cryptos, (cryptos, crypto) => {
    cryptos[crypto].balance = cryptos[crypto].balance.toString();
});

console.log(fiats);
console.log(cryptos);
