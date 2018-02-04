(function addFiats() {
    const fiatList = ["USD", "EUR", "NOK"];
    for (let i = 0; i < fiatList.length; i++) {
        const currentFiat = fiatList[i];
        cryp.fiats[currentFiat] = {
            invested: new Big("0"),
            hedged: new Big("0"),
        };
    }
})();

function addCryptoIfNew(crypto) {
    if (cryp.fiats[crypto] === undefined && cryp.cryptos[crypto] === undefined) {
        cryp.cryptos[crypto] = {
            balance: new Big("0"),
            ticker: crypto
        };
    }
}

// loop through transactions array (from database)
// add cryptos to cryp object
// set crypto balances & fiat invested/hedged
for (let i = 0; i < transactions.length; i++) {

    const transaction = transactions[i];
    const type = transaction.type;

    if (type != "deposit" && type != "withdrawal") {
        cryp.tradeCount = cryp.tradeCount.plus(1);
    };

    const buy = transaction.buy;
    if (buy.amount != "" && buy.currency != "") {
        addCryptoIfNew(buy.currency);
        if (cryp.cryptos[buy.currency] === undefined) {
            // buying fiat
            const hedged = cryp.fiats[buy.currency].hedged;
            cryp.fiats[buy.currency].hedged = hedged.plus(buy.amount);
        } else {
            // buying crypto
            const balance = cryp.cryptos[buy.currency].balance;
            cryp.cryptos[buy.currency].balance = balance.plus(buy.amount);
        }
    }

    const sell = transaction.sell;
    if (sell.amount != "" && sell.currency != "") {
        addCryptoIfNew(sell.currency);
        if (cryp.cryptos[sell.currency] === undefined) {
            // selling fiat
            const invested = cryp.fiats[sell.currency].invested;
            cryp.fiats[sell.currency].invested = invested.plus(sell.amount);
        } else {
            // selling crypto
            const balance = cryp.cryptos[sell.currency].balance;
            cryp.cryptos[sell.currency].balance = balance.minus(sell.amount);
        }
    }

    const fee = transaction.fee;
    if (fee.amount != "" && fee.currency != "") {
        addCryptoIfNew(fee.currency);
        if (cryp.cryptos[fee.currency] === undefined) {
            // fee in fiat
        } else {
            // fee in crypto
            const balance = cryp.cryptos[fee.currency].balance;
            cryp.cryptos[fee.currency].balance = balance.minus(fee.amount);
        }
    }

}

loopObject(cryp.cryptos, (crypto, i) => {
    cryp.cryptoTickers.push(crypto);
    if (i > 0) cryp.cryptoTickersString += ",";
    cryp.cryptoTickersString += crypto;
    cryp.cryptoBalances.push(cryp.cryptos[crypto].balance);
});
