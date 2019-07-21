require("core-js/modules/es.regexp.constructor");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

var hex = require('./hex');

var bech32impl = require('bech32');

function bech32ToAddress(bech32Str) {
  var ownKey = bech32impl.decode(bech32Str);
  return hex.bytesToHex(bech32impl.fromWords(ownKey.words)).toUpperCase();
}

function addressToBech32(prefix, str) {
  var strByte = bech32impl.toWords(Buffer.from(str, 'hex'));
  return bech32impl.encode(prefix, strByte);
}

function isBech32(prefix, str) {
  if (!prefix || prefix.length === 0) {
    return false;
  }

  var preReg = new RegExp("^".concat(prefix, "1"));

  if (!preReg.test(str)) {
    return false;
  }

  var allReg = new RegExp(/^[0-9a-zA-Z]*$/i);

  if (!allReg.test(str)) {
    return false;
  }

  try {
    bech32ToAddress(str);
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = {
  isBech32: isBech32,
  addressToBech32: addressToBech32,
  bech32ToAddress: bech32ToAddress
};
//# sourceMappingURL=bech32.js.map