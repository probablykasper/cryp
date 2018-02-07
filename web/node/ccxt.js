const ccxt = require("ccxt");
let exchange1 = new ccxt.bittrex();
let exchange2 = new ccxt.binance();
let exchange3 = new ccxt.kucoin();
let exchange4 = new ccxt.cryptopia();
let sleep = (ms) => new Promise (resolve => setTimeout (resolve, ms));
(async () => {
    let markets = await exchange1.fetchMarkets();
    for (let i = 0; i < markets.length; i++) {
        const market = markets[i];
        // console.log(market.base);
        const symbol = "SC/BTC";
        if (market.symbol == symbol) {
            await sleep(exchange1.rateLimit); // milliseconds
            // console.log (await exchange1.fetchOHLCV (symbol, '1d', new Date("01-12-2018").valueOf(), 1)) // one minute
            const ohlcv = await exchange1.fetchOHLCV (symbol, '1d', new Date("05-01-2017"), 50);
            console.log(ohlcv.length);
            console.log(ohlcv[0]);
            console.log(ohlcv[ohlcv.length-1]);
        }
    }
})();
