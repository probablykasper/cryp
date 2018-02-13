const User = require("./mongoose-models").User;
const Candlestick = require("./mongoose-models").Candlestick;

module.exports = (transactions, userID, callback) => {

    if (typeof transactions == "object") {

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

}
