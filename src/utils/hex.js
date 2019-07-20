function hexToBytes(hex) {
  const bytes = [];
  for (let c = 0; c < hex.length; c += 2) {
    bytes.push(parseInt(hex.substr(c, 2), 16));
  }
  return bytes;
}

function bytesToHex(bytes) {
  const hex = [];

  for (let i = 0; i < bytes.length; i++) { // eslint-disable-line
    hex.push((bytes[i] >>> 4).toString(16)); // eslint-disable-line
    hex.push((bytes[i] & 0xf).toString(16)); // eslint-disable-line
  }
  return hex.join('').toUpperCase();
}

function stringToHex(str) {
  const bytes = [];

  for (let i = 0; i < str.length; i++) { // eslint-disable-line
    bytes.push(str.charCodeAt(i).toString(16));
  }
  return bytes.join('');
}

function arrToHex(arr, hasPrefix = true) {
  const hex = arr
    .map(e => {
      return `00${(e & 0xff).toString(16)}`.slice(-2); // eslint-disable-line
    })
    .join('');
  if (hasPrefix) return '0x'.concat(hex);
  return hex;
}

function hexToArr(_hex, hasPrefix = true) {
  let hex = _hex;
  if (hasPrefix) {
    hex = hex.slice(2);
  }

  return hexToBytes(hex);
}

function isHex(_str) {
  const str = _str.replace('0x', '');
  return /^[0-9a-fA-F]*$/i.test(str);
}

module.exports = {
  hexToBytes,
  bytesToHex,
  stringToHex,
  isHex,
  arrToHex,
  hexToArr,
};
