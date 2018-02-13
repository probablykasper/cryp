const Candlestick = require("./mongoose-models").Candlestick;

global.fetch = require('node-fetch');
const cc = require('cryptocompare');

function ccToDate(cryptoCompareTimestamp) {
    timestamp = Number(cryptoCompareTimestamp+"000");
    return new Date(timestamp);
}

const hourRateLimit = process.env.CRYPTO_COMPARE_HOUR_RATE_LIMIT_HISTORY;
const msToWait = Math.ceil(1/(hourRateLimit/60/60/1000));

const btcToDate = new Date("2011-01-01 00:00:00Z")
const pairs = [
    {
        fromCurrency: "BTC",
        toCurrency: "USD",
        toDate: btcToDate,
    },
    {
        fromCurrency: "USDT",
        toCurrency: "BTC",
        toDate: new Date("2017-05-01 00:00:00Z"),
    }
];

function checkCandlesticks(data, fromCurrency, toCurrency) {
    for (let i = 0; i < data.length; i++) {
        const currentDate = ccToDate(data[i].time);
        // console.log(currentDate);
        Candlestick.findOne({
            fromSymbol: fromCurrency,
            toSymbol: toCurrency,
            date: currentDate,
            timeframe: "hour"
        }, (err, candlestick) => {
            if (err) {
                console.log("----------------------------------err");
                console.error(err);
            }
            if (candlestick == null) {
                new Candlestick({
                    fromSymbol: fromCurrency,
                    toSymbol: toCurrency,
                    date: currentDate,
                    timeframe: "hour",
                    open: data[i].open,
                    high: data[i].high,
                    low: data[i].low,
                    close: data[i].close,
                }).save().then((newCandlestick) => {
                    console.log(`- -       created candlestick for time ${newCandlestick.date}`);
                }).catch(console.error);
            }

        });
    }
}

function fetchDates(fromCurrency, toCurrency, toDate, callback, currentDate = new Date()) {
    console.log("- -   fetch dates");
    console.log(`- -     toDate         : ${toDate}`);
    console.log(`- -     currentDate    : ${currentDate}`);
    cc.histoHour(fromCurrency, toCurrency, {
        limit: 2000,
        timestamp: currentDate
    }).then((data) => {

        checkCandlesticks(data, fromCurrency, toCurrency);
        currentDate = ccToDate(data[0].time);
        currentDate.setHours(currentDate.getHours() - 1);
        console.log(`- -     new currentDate: ${currentDate}`);
        setTimeout(() => {
            if (currentDate > toDate) {
                fetchDates(fromCurrency, toCurrency, toDate, callback, currentDate);
            } else  {
                console.log(`- - pair ${fromCurrency}:${toCurrency} fetched`);
                callback();
            }
        }, msToWait);

    }).catch(console.error);
}

function fetchCurrencies(currencyIndex = 0) {
    const currentPair = pairs[currencyIndex];
    const fromCurrency = currentPair.fromCurrency;
    const toCurrency = currentPair.toCurrency;
    const toDate = currentPair.toDate;
    console.log(`- - - - - - - - - - fetching candlesticks`);
    console.log(`- - pair ${fromCurrency}:${toCurrency}`);
    console.log(`- - pair fetched to date ${toDate}`);
    fetchDates(fromCurrency, toCurrency, toDate, () => {
        currencyIndex++;
        if (currencyIndex < pairs.length) fetchCurrencies(currencyIndex);
        else console.log(`- - - - - - - - - - done fetching candlesticks`);
    });
}

if (process.env.FETCH_CANDLESTICKS == "true") fetchCurrencies();
