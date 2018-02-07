export const calculate = (res) => {

    loopObject(cryp.cryptos, (crypto) => {
        const cryptoValue = cryp.cryptos[crypto].balance.times(res[crypto][cryp.primaryCurrency]);
        cryp.cryptos[crypto].valueInPrimaryCurrency = cryptoValue;
        cryp.cryptoBalancesPrimary.push(cryptoValue); // for charts
        cryp.portfolioValue = cryp.portfolioValue.plus(cryptoValue);
    });

}
