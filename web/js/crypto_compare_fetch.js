export const fetched = (callback) => {
    console.log("boi");
    const getReq = `fsyms=${cryp.cryptoTickersString}&tsyms=${cryp.primaryCurrency}`;
    const url = "https://min-api.cryptocompare.com/data/pricemulti?"+getReq;
    xhr(null, url, (res) => {
        callback(res);
    }, {type: "GET"});
}
