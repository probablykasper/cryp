if (page == "overview") {

    // portfolio value
    $(".portfolio-value .card-container")
        .append(`<p>${cryp.portfolioValue} ${cryp.primaryCurrency}</p>`);

    // realized gains

    // unrealized gains

    loopObject(cryp.fiats, (fiat) => {
        if (cryp.fiats[fiat].invested > 0 || fiat == cryp.primaryCurrency) {
            // total fiat invested
            $(".total-fiat-invested .card-container")
                .append(`<p>${cryp.fiats[fiat].invested} ${fiat}</p>`);
            // total fiat hedged
            $(".total-fiat-hedged .card-container")
                .append(`<p>${cryp.fiats[fiat].hedged} ${fiat}</p>`);
        }
    });

    // total trades
    $(".total-trades .card-container")
        .append(`<p>${cryp.tradeCount}</p>`);

} else if (page == "balance") {

    // chart
    const ctx = $("canvas#balance");
    Chart.defaults.global.defaultFontFamily = '"Rubik", sans-serif';
    const balanceChart = new Chart(ctx, {
        type: "horizontalBar",
        data: {
            labels: cryp.cryptoTickers,
            datasets: [{
                label: "Value in "+cryp.primaryCurrency,
                data: cryp.cryptoBalancesPrimary,
                backgroundColor: "#16C19D",
            }],
        },
        options: {
            legend: {
                display: false,
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                    },
                    gridLines: {
                        display: false,
                    },
                    // barPercentage: 1,
                    // categoryPercentage: 1,
                    maxBarThickness: 20,
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                    },
                }],
            }
        }
    });

    // table header - Value in primaryCurrency
    $("table.crypto-info-table thead td.value")
        .text("Value in "+cryp.primaryCurrency);

    // table rows
    function addBalanceRow(amount, cryptocurrency, value) {
        const $newRow = $("table.balance-table-sample tr").clone();
        $newRow.find("td.crypto-amount").text(amount.toFixed(8));
        $newRow.find("td.cur").html("&nbsp;"+cryptocurrency);
        $newRow.find("td.value").text(value.toFixed(2));
        $("table.crypto-info-table tbody").append($newRow);
    }
    loopObject(cryp.cryptos, (crypto) => {
        addBalanceRow(cryp.cryptos[crypto].balance, crypto, cryp.cryptos[crypto].valueInPrimaryCurrency);
    });

} else if (page == "gains") {

}
