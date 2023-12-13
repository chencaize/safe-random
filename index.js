"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SAFE_RANDOM_MAX_8 = 1 << 8;
var SAFE_RANDOM_MAX_16 = 1 << 16;
var SAFE_RANDOM_MAX_32 = 1 << 32;
var SAFE_RANDOM_MSG_CRYPTO_NOT_SUPPORT = "Your browser is not support crypto,use Math.random() replace";
var SAFE_RANDOM_CRYPTO = null;
(function getCrypto() {
    if (window["crypto"]) {
        SAFE_RANDOM_CRYPTO = window["crypto"];
    }
    else if (window["webkitCrypto"]) {
        SAFE_RANDOM_CRYPTO = window["webkitCrypto"];
    }
    else if (window["mozCrypto"]) {
        SAFE_RANDOM_CRYPTO = window["mozCrypto"];
    }
    else if (window["oCrypto"]) {
        SAFE_RANDOM_CRYPTO = window["oCrypto"];
    }
    else if (window["msCrypto"]) {
        SAFE_RANDOM_CRYPTO = window["msCrypto"];
    }
    else {
        console.warn(SAFE_RANDOM_MSG_CRYPTO_NOT_SUPPORT);
        SAFE_RANDOM_CRYPTO = null;
    }
})();
function unSafeRandom() {
    return Math.random();
}
function safeRandom(length) {
    if (length === void 0) { length = 16; }
    var result = -1;
    if (SAFE_RANDOM_CRYPTO === null) {
        result = unSafeRandom();
        return result;
    }
    switch (length) {
        case 8:
            result = crypto.getRandomValues(new Uint8Array(1))[0] / SAFE_RANDOM_MAX_8;
            break;
        case 16:
            result = crypto.getRandomValues(new Uint16Array(1))[0] / SAFE_RANDOM_MAX_16;
            break;
        case 32:
            result = crypto.getRandomValues(new Uint32Array(1))[0] / SAFE_RANDOM_MAX_32;
            break;
        default:
            result = crypto.getRandomValues(new Uint16Array(1))[0] / SAFE_RANDOM_MAX_16;
            break;
    }
    return result;
}
exports.default = safeRandom;
