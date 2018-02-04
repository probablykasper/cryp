window.loopObject = (object, callback) => {
    let i = 0;
    for (let key in object) {
        // skip loop if the property is from prototype
        if (!object.hasOwnProperty(key)) continue;

        // callback(object, key);
        callback(key, i);
        i++;
    }
}

window.xhr = function(reqContent, url, callback, options = {}) {
    var xhr = new XMLHttpRequest();
    if (options.type == undefined)        options.type = "POST";
    if (options.contentType == undefined) options.contentType = "json";
    // if (options.contentType == undefined) options.contentType = "json";
    xhr.open(options.type, url, true);
    if (options.type == "GET") {
        xhr.send();
    } else if (options.contentType == "values") {
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

// self-invoking function replacement (looks cleaner imo)
window.fold = (description, callback) => {
    callback();
}
