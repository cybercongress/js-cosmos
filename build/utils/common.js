require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.array.sort");

require("core-js/modules/es.array-buffer.slice");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.match");

require("core-js/modules/es.string.trim");

require("core-js/modules/es.typed-array.uint8-array");

require("core-js/modules/es.typed-array.copy-within");

require("core-js/modules/es.typed-array.every");

require("core-js/modules/es.typed-array.fill");

require("core-js/modules/es.typed-array.filter");

require("core-js/modules/es.typed-array.find");

require("core-js/modules/es.typed-array.find-index");

require("core-js/modules/es.typed-array.for-each");

require("core-js/modules/es.typed-array.includes");

require("core-js/modules/es.typed-array.index-of");

require("core-js/modules/es.typed-array.iterator");

require("core-js/modules/es.typed-array.join");

require("core-js/modules/es.typed-array.last-index-of");

require("core-js/modules/es.typed-array.map");

require("core-js/modules/es.typed-array.reduce");

require("core-js/modules/es.typed-array.reduce-right");

require("core-js/modules/es.typed-array.reverse");

require("core-js/modules/es.typed-array.set");

require("core-js/modules/es.typed-array.slice");

require("core-js/modules/es.typed-array.some");

require("core-js/modules/es.typed-array.sort");

require("core-js/modules/es.typed-array.subarray");

require("core-js/modules/es.typed-array.to-locale-string");

require("core-js/modules/es.typed-array.to-string");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var Sha256 = require('sha256');

var Secp256k1 = require('secp256k1');

var RIPEMD160 = require('ripemd160');

var _ = require('lodash');

var toBN = require('number-to-bn');

var crypto = require('crypto');

var _require = require('./hex'),
    bytesToHex = _require.bytesToHex,
    hexToBytes = _require.hexToBytes;

function aminoPrefix(name) {
  var a = Sha256(name);
  var b = hexToBytes(a);

  while (b[0] === 0) {
    b = b.slice(1, b.length - 1);
  }

  b = b.slice(3, b.length - 1);

  while (b[0] === 0) {
    b = b.slice(1, b.length - 1);
  }

  b = b.slice(0, 4);
  return b;
}

function marshalBinary(prefix, message) {
  var prefixBytes = aminoPrefix(prefix);
  prefixBytes = Buffer.from(prefixBytes.concat(message.length));
  prefixBytes = Buffer.concat([prefixBytes, message]);
  return prefixBytes;
}

function getAddress(_publicKey) {
  var publicKey = _publicKey;

  if (publicKey.length > 33) {
    publicKey = publicKey.slice(5, publicKey.length);
  }

  var hmac = Sha256(publicKey);
  var b = Buffer.from(hexToBytes(hmac));
  var addr = new RIPEMD160().update(b);
  return addr.digest('hex').toUpperCase();
}

function importPrivateKey(secretKey) {
  var secretBytes = Buffer.from(secretKey, 'hex');
  var pubKey = Secp256k1.publicKeyCreate(secretBytes);
  return {
    address: getAddress(pubKey),
    privateKey: secretKey,
    publicKey: bytesToHex(pubKey)
  };
}

function sign(privateKey, msgJson) {
  // console.log('cosmos msgJson', JSON.stringify(sortObject(JSON.parse(msgJson))));
  var hash = crypto.createHash('sha256').update(JSON.stringify(sortObject(JSON.parse(msgJson)))).digest('hex');
  var buf = Buffer.from(hash, 'hex');
  var prikeyArr = Buffer.from(new Uint8Array(hexToBytes(privateKey)));
  var signObj = Secp256k1.sign(buf, prikeyArr);
  return Array.from(signObj.signature); // Alternative way:
  // const sigByte = Buffer.from(JSON.stringify(sortObject(JSON.parse(msgJson))));
  // const sig32 = Buffer.from(Sha256(sigByte, {
  //   asBytes: true
  // }));
  // const prikeyArr = Buffer.from(new Uint8Array(hexToBytes(privateKey)));
  // const sig = Secp256k1.sign(sig32, prikeyArr);
  // return Array.from(sig.signature);
}

function weiToDecimals(_wei, _decimals) {
  var wei = _wei;
  var decimals = _decimals;
  var zero = toBN(0);
  var negative1 = toBN(-1);
  var negative = toBN(wei.toString(10), 10).lt(zero); // eslint-disable-line

  var baseLength = Math.pow(10, decimals).toString().length - 1 || 1;
  var decimalsBN = toBN(Math.pow(10, decimals).toString(10), 10);

  if (negative) {
    wei = toBN(wei.toString(10), 10).mul(negative1);
  }

  var fraction = toBN(wei.toString(10), 10).mod(decimalsBN).toString(10); // eslint-disable-line

  while (fraction.length < baseLength) {
    fraction = "0".concat(fraction);
  }

  fraction = fraction.match(/^([0-9]*[1-9]|0)(0*)/)[1]; // eslint-disable-line

  var whole = toBN(wei.toString(10), 10).div(decimalsBN).toString(10); // eslint-disable-line

  var value = '' + whole + (fraction == '0' ? '' : '.' + fraction); // eslint-disable-line

  if (negative) {
    value = "-".concat(value);
  }

  return _.trim(value, '.');
}

function sortObject(obj) {
  if (obj === null) return null;
  if (_typeof(obj) !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(sortObject);
  var sortedKeys = Object.keys(obj).sort();
  var result = {};
  sortedKeys.forEach(function (key) {
    result[key] = sortObject(obj[key]);
  });
  return result;
}

module.exports = {
  marshalBinary: marshalBinary,
  hexToBytes: hexToBytes,
  sign: sign,
  importPrivateKey: importPrivateKey,
  weiToDecimals: weiToDecimals,
  sortObject: sortObject
};
//# sourceMappingURL=common.js.map