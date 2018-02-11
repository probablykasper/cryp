const Candlestick = require("./mongoose-models").Candlestick;

global.fetch = require('node-fetch');
const cc = require('cryptocompare');

function ccToDate(cryptoCompareTimestamp) {
    timestamp = Number(cryptoCompareTimestamp+"000");
    return new Date(timestamp);
}

const hourRateLimit = process.env.CRYPTO_COMPARE_HOUR_RATE_LIMIT_HISTORY;
const msToWait = Math.ceil(1/(hourRateLimit/60/60/1000));
const endDate = new Date("2011-01-01 00:00:00Z");

const crypto = "BTC";
const fiat = "USD";

function checkCandlesticks(data) {
    // for (let i = 0; i < data.length; i += 200) {
    for (let i = 0; i < data.length; i++) {
        const currentDate = ccToDate(data[i].time);
        console.log(currentDate);
        Candlestick.findOne({
            fromSymbol: crypto,
            toSymbol: fiat,
            date: currentDate,
            timeframe: "hour"
        }, (err, candlestick) => {
            if (err) {
                console.log("----------------------------------err");
                console.error(err);
            }
            if (candlestick == null) {
                new Candlestick({
                    fromSymbol: crypto,
                    toSymbol: fiat,
                    date: currentDate,
                    timeframe: "hour",
                    open: data[i].open,
                    high: data[i].high,
                    low: data[i].low,
                    close: data[i].close,
                }).save().then((newCandlestick) => {
                    console.log(`Created candlestick for time ${newCandlestick.date}`);
                }).catch(console.error);
            }

        });
    }
}

let currentDate = new Date();
let i = 0;
if (process.env.FETCH_CANDLESTICKS == "true") fetchDates();
function fetchDates() {
    cc.histoHour(crypto, fiat, {
        limit: 2000,
        timestamp: currentDate
    }).then((data) => {

        checkCandlesticks(data);
        currentDate = ccToDate(data[0].time);
        currentDate.setHours(currentDate.getHours() - 1);
        console.log(",,,,,", currentDate);
        i++;
        setTimeout(() => {
            if (currentDate > endDate) {
                fetchDates();
            } else {
                "all dates fetched :)";
            }
        }, msToWait);

    }).catch(console.error);
}



// const crypto = "BTC";
// // let fiats = ["USD", "NOK"];
// let fiats = ["USD"];
// let fiatIndex = 0;
// const endDate = new Date("2011-01-01 00:00:00Z");
// function loopDates(currentDate, callback) {
//     cc.histoHour(crypto, fiats[fiatIndex], {
//         limit: 2000,
//         timestamp: currentDate,
//     }).then((data) => {
//         const newDate = ccToDate(data[data.length-1].time);
//         for (let i = 0; i < data.length; i++) {
//             date = ccToDate(data[i].time);
//             console.log(date);
//         }
//         if (endDate < new Date()) {
//             setTimeout(() => {
//                 loopDates(newDate, () => {
//                     callback();
//                     console.log("========================================1");
//                 });
//             }, msToWait);
//             console.log("========================================2");
//         } else {
//             callback();
//         }
//         // loopDates();
//         // console.log(data[0]);
//         // console.log(data[data.length-1]);
//     }).catch((err) => {
//         console.log("====================================99");
//         console.error(err);
//     });
// }
// function loopFiats() {
//     loopDates(new Date(), () => {
//         console.log("----------------------------------------------------3");
//         if (fiatIndex < fiats.length) {
//             setTimeout(() => {
//                 loopFiats();
//             }, msToWait);
//         }
//     });
//     fiatIndex++;
// }
// loopFiats();






// const crypto = "BTC";
// const fiat = "USD";
// const limit = "2000";
// const date = new Date("2011-01-01 00:00:00Z");
// function getDate(cryptoCompareTimestamp) {
//     timestamp = Number(cryptoCompareTimestamp+"000");
//     const date = new Date(timestamp);
//     console.log(date);
// }
//
// cc.histoHour(crypto, fiat, {
//     limit: limit,
//     timestamp: date,
// }).then((data) => {
//     for (let i = 0; i < data.length; i++) {
//         getDate(data[i].time);
//     }
//     // console.log(data[0]);
//     // console.log(data[data.length-1]);
// }).catch(console.error)
