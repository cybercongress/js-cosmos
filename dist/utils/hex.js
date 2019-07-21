require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.parse-int");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.replace");

function hexToBytes(hex) {
  var bytes = [];

  for (var c = 0; c < hex.length; c += 2) {
    bytes.push(parseInt(hex.substr(c, 2), 16));
  }

  return bytes;
}

function bytesToHex(bytes) {
  var hex = [];

  for (var i = 0; i < bytes.length; i++) {
    // eslint-disable-line
    hex.push((bytes[i] >>> 4).toString(16)); // eslint-disable-line

    hex.push((bytes[i] & 0xf).toString(16)); // eslint-disable-line
  }

  return hex.join('').toUpperCase();
}

function stringToHex(str) {
  var bytes = [];

  for (var i = 0; i < str.length; i++) {
    // eslint-disable-line
    bytes.push(str.charCodeAt(i).toString(16));
  }

  return bytes.join('');
}

function arrToHex(arr) {
  var hasPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var hex = arr.map(function (e) {
    return "00".concat((e & 0xff).toString(16)).slice(-2); // eslint-disable-line
  }).join('');
  if (hasPrefix) return '0x'.concat(hex);
  return hex;
}

function hexToArr(_hex) {
  var hasPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var hex = _hex;

  if (hasPrefix) {
    hex = hex.slice(2);
  }

  return hexToBytes(hex);
}

function isHex(_str) {
  var str = _str.replace('0x', '');

  return /^[0-9a-fA-F]*$/i.test(str);
}

module.exports = {
  hexToBytes: hexToBytes,
  bytesToHex: bytesToHex,
  stringToHex: stringToHex,
  isHex: isHex,
  arrToHex: arrToHex,
  hexToArr: hexToArr
};
//# sourceMappingURL=hex.js.map