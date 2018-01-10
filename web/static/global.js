$(document).ready(() => {



// https://github.com/MikeMcl/big.js
"use strict";

(function commonFunctions() {
    window.loopObject = (object, callback) => {
        for (let key in object) {
            // skip loop if the property is from prototype
            if (!object.hasOwnProperty(key)) continue;

            callback(object, key);
        }
    }
    window.xhr = function(reqContent, url, callback, options = {}) {
        var xhr = new XMLHttpRequest();
        if (options.type == undefined)        options.type = "POST";
        if (options.contentType == undefined) options.contentType = "json";
        // if (options.contentType == undefined) options.contentType = "json";
        xhr.open(options.type, url, true);
        if (options.contentType == "values") {
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send("data="+JSON.stringify(reqContent));
        } else if (options.contentType == "json") {
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send(JSON.stringify(reqContent));
        }
        // else if (options.contentType == "multipart") {
        //     // xhr.setRequestHeader("Content-type", "multipart/form-data");
        // }
        xhr.onreadystatechange = function() {
            if (this.readyState == 4) {
                let res = JSON.parse(this.responseText);
                if (!String(this.status).startsWith("2")) {
                    console.error("HTTP error "+this.status);
                    res.error = {
                        code: 404,
                        msg: null
                    }
                }
                callback(res);
            }
        };
    }
})();
(function ui() {
    if (loggedIn) {
        $("header.site-header img.account-icon").on("click", () => {
            $("header.site-header .account-box").toggleClass("visible");
        });
        $(document).on("click", (e) => {
            if (!$(e.target).parents("div.account-icon").length) {
                $("header.site-header .account-box").removeClass("visible");
            }
        });
    }

    let tooltipTimeout;
    $(".tooltip-area").on({
        mouseenter: (e) => {
            tooltipTimeout = setTimeout(() => {
                $(e.delegateTarget).children(".tooltip").addClass("visible");
            }, 500)
        },
        mouseleave: (e) => {
            clearTimeout(tooltipTimeout);
            $(e.delegateTarget).children(".tooltip").removeClass("visible");
        }
    });

    if (page == "transactions") {

        resizeInputs($('table.transactions-table tbody td'));
        function resizeInputs($inputs) {
            // var $inputs = $('table.transactions-table tbody td');

            // Resize based on text if text.length > 0
            // Otherwise resize based on the placeholder
            function resizeForText(text) {
                var $this = $(this);
                if (!text.trim() && $this.attr('placeholder')) {
                    text = $this.attr('placeholder').trim();
                }
                var $span = $this.parent().find('span');
                $span.text(text);
                var $inputSize = $span.width();
                $this.css("width", $inputSize+1);
            }

            $inputs.find('input').on("input", function (e) {
                var c = String.fromCharCode(e.keyCode | e.charCode);
                var $this = $(this);
                resizeForText.call($this, $this.val() + c);
            });
            // $inputs.find('input').keypress(function (e) {
            //     console.log("input");
            //     // if (e.which && e.charCode) {
            //         var c = String.fromCharCode(e.keyCode | e.charCode);
            //         var $this = $(this);
            //         resizeForText.call($this, $this.val() + c);
            //     // }
            // });
            //
            // // Backspace event only fires for keyup
            // $inputs.find('input').keyup(function (e) {
            //     console.log("input2");
            //     if (e.keyCode === 8 || e.keyCode === 46) {
            //         resizeForText.call($(this), $(this).val());
            //     }
            // });

            $inputs.find('input').each(function () {
                var $this = $(this);
                resizeForText.call($this, $this.val())
            });
        }

        function addTransactionRow(transaction) {
            const $newRow = $("table.transactions-table-sample tr").clone();
            if (transaction) { // else fields will be empty
                $newRow.find("td.type select").val(transaction.type);
                $newRow.find("td.buy-amount input").val(transaction.buy.amount);
                $newRow.find("td.buy-currency input").val(transaction.buy.currency);
                $newRow.find("td.sell-amount input").val(transaction.sell.amount);
                $newRow.find("td.sell-currency input").val(transaction.sell.currency);
                $newRow.find("td.fee-amount input").val(transaction.fee.amount);
                $newRow.find("td.fee-currency input").val(transaction.fee.currency);
                $newRow.find("td.exchange input").val(transaction.exchange);
                $newRow.find("td.group input").val(transaction.group);
                $newRow.find("td.note input").val(transaction.note);
                $newRow.find("td.date input").val(transaction.date);
            }
            $(".transactions-table-card tbody").append($newRow);
            resizeInputs($('table.transactions-table tbody td'));
        }
        for (let i = 0; i < transactions.length; i++) {
            addTransactionRow(transactions[i]);
        }

        (function buttons() {

            // New
            $(".transactions-table-card button.new").on("click", () => {
                addTransactionRow();
            });

            // Save
            $(".transactions-table-card button.save").on("click", () => {
                let newTransactions = [];
                // loop rows
                $(".transactions-table-card tbody tr").each((rowIndex, el) => {
                    const $el = $(el);
                    const type = $el.find("td.type select").val();
                    const transaction = {
                        type: type,
                        buy: {
                            amount: $el.find("td.buy-amount input").val(),
                            currency: $el.find("td.buy-currency input").val()
                        },
                        sell: {
                            amount: $el.find("td.sell-amount input").val(),
                            currency: $el.find("td.sell-currency input").val()
                        },
                        fee: {
                            amount: $el.find("td.fee-amount input").val(),
                            currency: $el.find("td.fee-currency input").val()
                        },
                        exchange: $el.find("td.exchange input").val(),
                        group: $el.find("td.group input").val(),
                        note: $el.find("td.note input").val(),
                        date: $el.find("td.date input").val(),
                    };
                    newTransactions[rowIndex] = transaction;
                });
                xhr(newTransactions, "/update-transactions", (res) => {
                    if (res.err) {
                        console.log("error sending xhr, when saving");
                        console.log(err);
                    } else {
                        console.log("saved new transactions. Reloading...");
                        location.reload();
                    }
                });
            });
        })();

    }
    else if (page == "balance") {

    }

})();

const primaryCurrency = "NOK";

if (loggedIn) cryptoCalculations();
function cryptoCalculations() {
    let fiats = {
        NOK: {
            invested: new Big("0"),
            hedged: new Big("0")
        },
        EUR: {
            invested: new Big("0"),
            hedged: new Big("0")
        }
    };
    let cryptos = {};
    function addCryptoIfNew(crypto) {
        if (fiats[crypto] === undefined) {
            if (cryptos[crypto] === undefined) {
                cryptos[crypto] = {
                    balance: new Big("0")
                };
            }
        }
    }
    let tradeCount = 0;
    for (let i = 0; i < transactions.length; i++) {

        const transaction = transactions[i];
        const type = transaction.type;

        const buy = transaction.buy;
        if (buy.amount != "" && buy.currency != "") {
            addCryptoIfNew(buy.currency);
            if (cryptos[buy.currency] === undefined) {
                // buying fiat
                const hedged = fiats[buy.currency].hedged;
                fiats[buy.currency].hedged = hedged.plus(buy.amount);
            } else {
                // buying crypto
                const balance = cryptos[buy.currency].balance;
                cryptos[buy.currency].balance = balance.plus(buy.amount);
            }
        }
        const sell = transaction.sell;
        if (sell.amount != "" && sell.currency != "") {
            addCryptoIfNew(sell.currency);
            if (cryptos[sell.currency] === undefined) {
                // selling fiat
                const invested = fiats[sell.currency].invested;
                fiats[sell.currency].invested = invested.plus(sell.amount);
            } else {
                // selling crypto
                const balance = cryptos[sell.currency].balance;
                cryptos[sell.currency].balance = balance.minus(sell.amount);
            }
        }
        const fee = transaction.fee;
        if (fee.amount != "" && fee.currency != "") {
            addCryptoIfNew(fee.currency);
        }

        if (type != "deposit" && type != "withdrawal") tradeCount++;
    }

    loopObject(fiats, (fiats, fiat) => {
        fiats[fiat].invested = fiats[fiat].invested.toString();
        if (
            (page == "home" && fiats[fiat].invested > 0)
            || fiat == primaryCurrency
        ) {
            $(".total-fiat-invested .card-container")
                .append(`<p>${fiats[fiat].invested} ${fiat}</p>`);
            $(".total-fiat-hedged .card-container")
                .append(`<p>${fiats[fiat].hedged} ${fiat}</p>`);
        }
    });
    $(".total-trades .card-container")
        .append(`<p>${tradeCount}</p>`);

    loopObject(cryptos, (cryptos, crypto) => {
        cryptos[crypto].balance = cryptos[crypto].balance.toString();
    });

    console.log(fiats);
    console.log(cryptos);
}



});
