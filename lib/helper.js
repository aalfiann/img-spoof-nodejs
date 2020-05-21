function inArray(arr, value) {
    return arr.indexOf(value) !== -1;
}

function rawurldecode (str) {
    return decodeURIComponent((str + '')
        .replace(/%(?![\da-f]{2})/gi, function () {
            return '%25';
        }));
}

module.exports = {
    inArray,
    rawurldecode
}