const hex = require('./hex');
const bech32impl = require('bech32');

function bech32ToAddress(bech32Str) {
  const ownKey = bech32impl.decode(bech32Str);

  return hex.bytesToHex(bech32impl.fromWords(ownKey.words)).toUpperCase();
}

function addressToBech32(prefix, str) {
  const strByte = bech32impl.toWords(Buffer.from(str, 'hex'));

  return bech32impl.encode(prefix, strByte);
}

function isBech32(prefix, str) {
  if (!prefix || prefix.length === 0) {
    return false;
  }

  const preReg = new RegExp(`^${prefix}1`);

  if (!preReg.test(str)) {
    return false;
  }

  const allReg = new RegExp(/^[0-9a-zA-Z]*$/i);

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
  isBech32,
  addressToBech32,
  bech32ToAddress,
};
