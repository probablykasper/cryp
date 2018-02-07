export const fetched = (callback) => {

    // fetch current prices
    const getReq = `fsyms=${cryp.cryptoTickersString}&tsyms=${cryp.primaryCurrency}`;
    const url = "https://min-api.cryptocompare.com/data/pricemulti?"+getReq;
    xhr(null, url, (res) => {
        callback(res);
    }, {type: "GET"});

    // fetch historical prices
    // for each transaction, get the value at the time in USD so that it can be used for realized gain



}
