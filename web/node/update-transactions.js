const User = require("./mongoose-models").User;
const Candlestick = require("./mongoose-models").Candlestick;
const Big = require("big.js");

module.exports = (transactions, userID, callback) => {

    if (typeof transactions != "object") {
        return;
    }

    const fifoChain = {

    }
    function ensureFifoChainHasCurrency(currency) {
        if (!fifoChain[currency]) {
            fifoChain[currency] = [];
        }
    }

    loopTransactions();
    function loopTransactions(i = 0) {

        const transaction = transactions[i];
        // round date to nearest hour
        let date = new Date(transaction.date);
        const minutes = date.getMinutes();
        if (minutes >= 30) date.setHours(date.getHours()+1);
        date.setMinutes(0);
        date.setSeconds(0);



        if (transaction.type == "Trade") {

            function addFifoBlocks() {

            }
            function eatFifoBlocks(currency, amount) {
                
            }

            // if buying crypto
            if (transaction.sell.currency == "USD") {
                ensureFifoChainHasCurrency(transaction.buy.currency);

                const fifoBuy = fifoChain[transaction.buy.currency];
                fifoBuy.push({
                    fiatValue: new Big(transaction.buy.amount),
                });

            // if selling crypto
            } else if (transaction.buy.currency == "USD") {
                ensureFifoChainHasCurrency(transaction.sell.currency);

                const fifoSell = fifoChain[transaction.sell.currency];
                let sellAmountLeft = new Big(transaction.sell.amount);

                function eatFifos() {

                    fifoSell[0].fiatValue = fifoSell[0].fiatValue.minus(sellAmountLeft);
                    sellAmountLeft.minus(fifoSell[0].fiatValue);
                    if (fifoSell[0].fiatValue > 0) {
                        eatFifos();
                    }

                    // fifoChain block is smaller than the sell amount
                    if (fiatSell[0].fiatValue < sellAmountLeft) {

                    }


                    fifoSell[0].fiatValue = fifoSell[0].fiatValue.minus(sellAmountLeft);
                    if (fifoSell[0].fiatValue == 0) {

                    }
                }

            // trading cryptos
            } else {

            }

            // if buy currency == fiat
            //      no realized gain
            // if sell currency == fiat
            //
            // else (buy&sell == crypto)
            //      get value of sell currency
            //

            Candlestick.findOne({
                fromSymbol: "BTC",
                toSymbol: "USD",
                date: date,
                timeframe: "hour",
            }, (err, candlestick) => {
                if (err) return logErr("01", "could not find candlestick");
                i++;
                if (i < transactions.length) loopTransactions(i);
            });
        }
    }

    User.findOneAndUpdate({
        _id: userID
    }, {
        $set: {
            transactions: transactions
        }
    }, {
        upsert: true
    }, (err, updatedUser) => {
        if (err) console.log(err);
        callback();
    });


}
