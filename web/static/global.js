/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// http://mikemcl.github.io/big.js/


$(document).ready(function () {
    __webpack_require__(4);
    __webpack_require__(3);
    if (loggedIn) {
        __webpack_require__(1);
    }
    __webpack_require__(2);
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

$(document).ready(function () {

    // http://mikemcl.github.io/big.js/
    "use strict";

    var _window$cryp;

    window.cryp = (_window$cryp = {
        cryptoTickers: []
    }, _defineProperty(_window$cryp, "cryptoTickers", []), _defineProperty(_window$cryp, "cryptoTickersString", ""), _defineProperty(_window$cryp, "cryptoBalances", []), _defineProperty(_window$cryp, "cryptoBalancesPrimary", []), _defineProperty(_window$cryp, "portfolioValue", new Big("0")), _defineProperty(_window$cryp, "primaryCurrency", "NOK"), _window$cryp);

    // (function commonFunctions() {
    //     window.loopObject = (object, callback) => {
    //         for (let key in object) {
    //             // skip loop if the property is from prototype
    //             if (!object.hasOwnProperty(key)) continue;
    //
    //             callback(object, key);
    //         }
    //     }
    //     window.xhr = function(reqContent, url, callback, options = {}) {
    //         var xhr = new XMLHttpRequest();
    //         if (options.type == undefined)        options.type = "POST";
    //         if (options.contentType == undefined) options.contentType = "json";
    //         // if (options.contentType == undefined) options.contentType = "json";
    //         xhr.open(options.type, url, true);
    //         if (options.type == "GET") {
    //             xhr.send();
    //         } else if (options.contentType == "values") {
    //             xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //             xhr.send("data="+JSON.stringify(reqContent));
    //         } else if (options.contentType == "json") {
    //             xhr.setRequestHeader("Content-type", "application/json");
    //             xhr.send(JSON.stringify(reqContent));
    //         }
    //         // else if (options.contentType == "multipart") {
    //         //     // xhr.setRequestHeader("Content-type", "multipart/form-data");
    //         // }
    //         xhr.onreadystatechange = function() {
    //             if (this.readyState == 4) {
    //                 let res = JSON.parse(this.responseText);
    //                 if (!String(this.status).startsWith("2")) {
    //                     console.error("HTTP error "+this.status);
    //                     res.error = {
    //                         code: 404,
    //                         msg: null
    //                     }
    //                 }
    //                 callback(res);
    //             }
    //         };
    //     }
    // })();
    // (function ui() {
    //     if (loggedIn) {
    //         $("header.site-header img.account-icon").on("click", () => {
    //             $("header.site-header .account-box").toggleClass("visible");
    //         });
    //         $(document).on("click", (e) => {
    //             if (!$(e.target).parents("div.account-icon").length) {
    //                 $("header.site-header .account-box").removeClass("visible");
    //             }
    //         });
    //     }
    //
    //     let tooltipTimeout;
    //     $(".tooltip-area").on({
    //         mouseenter: (e) => {
    //             tooltipTimeout = setTimeout(() => {
    //                 $(e.delegateTarget).children(".tooltip").addClass("visible");
    //             }, 500)
    //         },
    //         mouseleave: (e) => {
    //             clearTimeout(tooltipTimeout);
    //             $(e.delegateTarget).children(".tooltip").removeClass("visible");
    //         }
    //     });
    //
    //     if (page == "transactions") {
    //
    //         resizeInputs($("table.transactions-table tbody td:not(.date) td"));
    //         function resizeInputs($inputs) {
    //             // var $inputs = $('table.transactions-table tbody td');
    //
    //             // Resize based on text if text.length > 0
    //             // Otherwise resize based on the placeholder
    //             function resizeForText(text) {
    //                 var $this = $(this);
    //                 if (!text.trim() && $this.attr('placeholder')) {
    //                     text = $this.attr('placeholder').trim();
    //                 }
    //                 var $span = $this.parent().find('span');
    //                 $span.text(text);
    //                 var $inputSize = $span.width();
    //                 $this.css("width", $inputSize+1);
    //             }
    //
    //             $inputs.find('input').on("input", function (e) {
    //                 var c = String.fromCharCode(e.keyCode | e.charCode);
    //                 var $this = $(this);
    //                 resizeForText.call($this, $this.val() + c);
    //             });
    //             // $inputs.find('input').keypress(function (e) {
    //             //     console.log("input");
    //             //     // if (e.which && e.charCode) {
    //             //         var c = String.fromCharCode(e.keyCode | e.charCode);
    //             //         var $this = $(this);
    //             //         resizeForText.call($this, $this.val() + c);
    //             //     // }
    //             // });
    //             //
    //             // // Backspace event only fires for keyup
    //             // $inputs.find('input').keyup(function (e) {
    //             //     console.log("input2");
    //             //     if (e.keyCode === 8 || e.keyCode === 46) {
    //             //         resizeForText.call($(this), $(this).val());
    //             //     }
    //             // });
    //
    //             $inputs.find('input').each(function () {
    //                 var $this = $(this);
    //                 resizeForText.call($this, $this.val())
    //             });
    //         }
    //
    //         function addTransactionRow(transaction) {
    //             const $newRow = $("table.transactions-table-sample tr").clone();
    //             if (transaction) { // else fields will be empty
    //                 $newRow.find("td.type select").val(transaction.type);
    //                 $newRow.find("td.buy-amount input").val(transaction.buy.amount);
    //                 $newRow.find("td.buy-currency input").val(transaction.buy.currency);
    //                 $newRow.find("td.sell-amount input").val(transaction.sell.amount);
    //                 $newRow.find("td.sell-currency input").val(transaction.sell.currency);
    //                 $newRow.find("td.fee-amount input").val(transaction.fee.amount);
    //                 $newRow.find("td.fee-currency input").val(transaction.fee.currency);
    //                 $newRow.find("td.exchange input").val(transaction.exchange);
    //                 $newRow.find("td.group input").val(transaction.group);
    //                 $newRow.find("td.note input").val(transaction.note);
    //                 $newRow.find("td.date input").val(transaction.date);
    //             }
    //             $(".transactions-table-card tbody").append($newRow);
    //             resizeInputs($('table.transactions-table tbody td:not(.date)'));
    //         }
    //         for (let i = 0; i < transactions.length; i++) {
    //             addTransactionRow(transactions[i]);
    //         }
    //
    //         (function buttons() {
    //
    //             // New
    //             $(".transactions-table-card button.new").on("click", () => {
    //                 addTransactionRow();
    //             });
    //
    //             // Save
    //             $(".transactions-table-card button.save").on("click", () => {
    //                 let newTransactions = [];
    //                 // loop rows
    //                 $(".transactions-table-card tbody tr").each((rowIndex, el) => {
    //                     const $el = $(el);
    //                     const type = $el.find("td.type select").val();
    //                     const transaction = {
    //                         type: type,
    //                         buy: {
    //                             amount: $el.find("td.buy-amount input").val(),
    //                             currency: $el.find("td.buy-currency input").val()
    //                         },
    //                         sell: {
    //                             amount: $el.find("td.sell-amount input").val(),
    //                             currency: $el.find("td.sell-currency input").val()
    //                         },
    //                         fee: {
    //                             amount: $el.find("td.fee-amount input").val(),
    //                             currency: $el.find("td.fee-currency input").val()
    //                         },
    //                         exchange: $el.find("td.exchange input").val(),
    //                         group: $el.find("td.group input").val(),
    //                         note: $el.find("td.note input").val(),
    //                         date: $el.find("td.date input").val(),
    //                     };
    //                     newTransactions[rowIndex] = transaction;
    //                 });
    //                 xhr(newTransactions, "/update-transactions", (res) => {
    //                     if (res.err) {
    //                         console.log("error sending xhr, when saving");
    //                         console.log(err);
    //                     } else {
    //                         console.log("saved new transactions. Reloading...");
    //                         location.reload();
    //                     }
    //                 });
    //             });
    //         })();
    //
    //     }
    //     else if (page == "balance") {
    //
    //     }
    //
    // })();

    if (loggedIn) cryptoCalculations();
    function cryptoCalculations() {
        var fiats = {
            NOK: {
                invested: new Big("0"),
                hedged: new Big("0")
            },
            EUR: {
                invested: new Big("0"),
                hedged: new Big("0")
            }
        };
        var cryptos = {};
        function addCryptoIfNew(crypto) {
            if (fiats[crypto] === undefined) {
                if (cryptos[crypto] === undefined) {
                    cryptos[crypto] = {
                        balance: new Big("0"),
                        ticker: crypto
                    };
                }
            }
        }
        var tradeCount = 0;
        for (var i = 0; i < transactions.length; i++) {

            var transaction = transactions[i];
            var type = transaction.type;

            var buy = transaction.buy;
            if (buy.amount != "" && buy.currency != "") {
                addCryptoIfNew(buy.currency);
                if (cryptos[buy.currency] === undefined) {
                    // buying fiat
                    var hedged = fiats[buy.currency].hedged;
                    fiats[buy.currency].hedged = hedged.plus(buy.amount);
                } else {
                    // buying crypto
                    var balance = cryptos[buy.currency].balance;
                    cryptos[buy.currency].balance = balance.plus(buy.amount);
                }
            }
            var sell = transaction.sell;
            if (sell.amount != "" && sell.currency != "") {
                addCryptoIfNew(sell.currency);
                if (cryptos[sell.currency] === undefined) {
                    // selling fiat
                    var invested = fiats[sell.currency].invested;
                    fiats[sell.currency].invested = invested.plus(sell.amount);
                } else {
                    // selling crypto
                    var _balance = cryptos[sell.currency].balance;
                    cryptos[sell.currency].balance = _balance.minus(sell.amount);
                }
            }
            var fee = transaction.fee;
            if (fee.amount != "" && fee.currency != "") {
                addCryptoIfNew(fee.currency);
            }

            if (type != "deposit" && type != "withdrawal") tradeCount++;
        }

        loopObject(fiats, function (fiats, fiat) {
            // fiats[fiat].invested = fiats[fiat].invested.toString();
            if (page == "home" && fiats[fiat].invested > 0 || fiat == cryp.primaryCurrency) {
                $(".total-fiat-invested .card-container").append("<p>" + fiats[fiat].invested + " " + fiat + "</p>");
                $(".total-fiat-hedged .card-container").append("<p>" + fiats[fiat].hedged + " " + fiat + "</p>");
            }
        });
        $(".total-trades .card-container").append("<p>" + tradeCount + "</p>");

        loopObject(cryptos, function (cryptos, crypto) {
            // cryptos[crypto].balance = cryptos[crypto].balance.toString();
            cryp.cryptoTickers.push(crypto);
            cryp.cryptoTickersString += crypto + ",";
            cryp.cryptoBalances.push(cryptos[crypto].balance);
        });
        // cut off last , from cryptoTickersString
        if (cryp.cryptoTickersString.endsWith(",")) {
            cryp.cryptoTickersString = cryp.cryptoTickersString.slice(0, -1);
        }

        var getReq = "fsyms=" + cryp.cryptoTickersString + "&tsyms=" + cryp.primaryCurrency;
        var url = "https://min-api.cryptocompare.com/data/pricemulti?" + getReq;
        xhr(null, url, function (res) {
            function addBalanceRow(amount, cryptocurrency, value) {
                var $newRow = $("table.balance-table-sample tr").clone();
                $newRow.find("td.crypto-amount").text(amount.toFixed(8));
                $newRow.find("td.cur").html("&nbsp;" + cryptocurrency);
                $newRow.find("td.value").text(value.toFixed(2));
                $("table.crypto-info-table tbody").append($newRow);
            }
            loopObject(cryptos, function (cryptos, crypto) {
                var cryptoValue = cryptos[crypto].balance.times(res[crypto][cryp.primaryCurrency]);
                cryp.cryptoBalancesPrimary.push(cryptoValue);
                cryp.portfolioValue = cryp.portfolioValue.plus(cryptoValue);
                if (page == "balance") {
                    $("table.crypto-info-table thead td.value").text("Value in " + cryp.primaryCurrency);
                    addBalanceRow(cryptos[crypto].balance, crypto, cryptoValue);
                }
            });
            if (page == "overview") {
                $(".portfolio-value .card-container").append("<p>" + cryp.portfolioValue + " " + cryp.primaryCurrency + "</p>");
            }
            if (page == "balance") {
                var ctx = $("canvas#balance");
                Chart.defaults.global.defaultFontFamily = '"Rubik", sans-serif';

                var balanceChart = new Chart(ctx, {
                    type: "horizontalBar",
                    data: {
                        labels: cryp.cryptoTickers,
                        datasets: [{
                            label: "Value in " + cryp.primaryCurrency,
                            data: cryp.cryptoBalancesPrimary,
                            // backgroundColor: [
                            //     'rgba(255, 99, 132, 0.4)',
                            //     'rgba(54, 162, 235, 0.4)',
                            //     'rgba(255, 206, 86, 0.4)',
                            //     'rgba(75, 192, 192, 0.4)',
                            //     'rgba(153, 102, 255, 0.4)',
                            //     'rgba(255, 159, 64, 0.4)'
                            // ],
                            backgroundColor: "#16C19D",
                            // borderColor: [
                            //     'rgba(255,99,132,1)',
                            //     'rgba(54, 162, 235, 1)',
                            //     'rgba(255, 206, 86, 1)',
                            //     'rgba(75, 192, 192, 1)',
                            //     'rgba(153, 102, 255, 1)',
                            //     'rgba(255, 159, 64, 1)'
                            // ],
                            borderWidth: 0
                        }]
                    },
                    options: {
                        legend: {
                            display: false
                        },
                        layout: {
                            padding: {
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0
                            }
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                },
                                gridLines: {
                                    display: false
                                },
                                // barPercentage: 1,
                                // categoryPercentage: 1,
                                maxBarThickness: 20
                            }],
                            xAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });
            }
        }, { type: "GET" });

        console.log(fiats);
        console.log(cryptos);
        console.log(cryp);
    }
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (loggedIn) {
    $("header.site-header img.account-icon").on("click", function () {
        $("header.site-header .account-box").toggleClass("visible");
    });
    $(document).on("click", function (e) {
        if (!$(e.target).parents("div.account-icon").length) {
            $("header.site-header .account-box").removeClass("visible");
        }
    });
}

var tooltipTimeout = void 0;
$(".tooltip-area").on({
    mouseenter: function mouseenter(e) {
        tooltipTimeout = setTimeout(function () {
            $(e.delegateTarget).children(".tooltip").addClass("visible");
        }, 500);
    },
    mouseleave: function mouseleave(e) {
        clearTimeout(tooltipTimeout);
        $(e.delegateTarget).children(".tooltip").removeClass("visible");
    }
});

if (page == "transactions") {
    var resizeInputs = function resizeInputs($inputs) {
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
            $this.css("width", $inputSize + 1);
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
            resizeForText.call($this, $this.val());
        });
    };

    var addTransactionRow = function addTransactionRow(transaction) {
        var $newRow = $("table.transactions-table-sample tr").clone();
        if (transaction) {
            // else fields will be empty
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
        resizeInputs($('table.transactions-table tbody td:not(.date)'));
    };

    resizeInputs($("table.transactions-table tbody td:not(.date) td"));

    for (var i = 0; i < transactions.length; i++) {
        addTransactionRow(transactions[i]);
    }

    fold("buttons", function () {

        // New
        $(".transactions-table-card button.new").on("click", function () {
            addTransactionRow();
        });

        // Save
        $(".transactions-table-card button.save").on("click", function () {
            var newTransactions = [];
            // loop rows
            $(".transactions-table-card tbody tr").each(function (rowIndex, el) {
                var $el = $(el);
                var type = $el.find("td.type select").val();
                var transaction = {
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
                    date: $el.find("td.date input").val()
                };
                newTransactions[rowIndex] = transaction;
            });
            xhr(newTransactions, "/update-transactions", function (res) {
                if (res.err) {
                    console.log("error sending xhr, when saving");
                    console.log(err);
                } else {
                    console.log("saved new transactions. Reloading...");
                    location.reload();
                }
            });
        });
    });
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


window.loopObject = function (object, callback) {
    for (var key in object) {
        // skip loop if the property is from prototype
        if (!object.hasOwnProperty(key)) continue;

        callback(object, key);
    }
};

window.xhr = function (reqContent, url, callback) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    var xhr = new XMLHttpRequest();
    if (options.type == undefined) options.type = "POST";
    if (options.contentType == undefined) options.contentType = "json";
    // if (options.contentType == undefined) options.contentType = "json";
    xhr.open(options.type, url, true);
    if (options.type == "GET") {
        xhr.send();
    } else if (options.contentType == "values") {
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("data=" + JSON.stringify(reqContent));
    } else if (options.contentType == "json") {
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify(reqContent));
    }
    // else if (options.contentType == "multipart") {
    //     // xhr.setRequestHeader("Content-type", "multipart/form-data");
    // }
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var res = JSON.parse(this.responseText);
            if (!String(this.status).startsWith("2")) {
                console.error("HTTP error " + this.status);
                res.error = {
                    code: 404,
                    msg: null
                };
            }
            callback(res);
        }
    };
};

// self-invoking function replacement (looks cleaner imo)
window.fold = function (description, callback) {
    callback();
};

/***/ })
/******/ ]);