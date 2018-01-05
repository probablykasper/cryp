{
    type: "",
    buy: [],
    sell: [],
    fee: [],
    exchange: "",
    group: "",
    note: "",
    date: new Date("")
}
let json = [
    {
        type: "fiatBuy",
        buy: [0.04073887, "BTC"],
        sell: [932.03, "NOK"],
        fee: [],
        exchange: "Bittrex",
        group: "",
        note: "via Anycoin Direct",
        date: new Date("2017-07-25 11:04:48")
    },
    {
        type: "trade",
        buy: [6120.03355798, "SC"],
        sell: [0.02006253, "BTC"],
        fee: [0.00005003, "BTC"],
        exchange: "Bittrex",
        group: "",
        note: "",
        date: new Date("2017-07-27 21:49:53")
    },
    {
        type: "moveExchange",
        amount: [100, "SC"]
        fee: [0.1, "SC"],
        fromExchange: "Bittrex",
        toExchange: "SC Wallet",
        group: "",
        note: "",
        date: new Date("2017-07-27 22:00:55")
    }
];
