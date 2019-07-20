const Sha256 = require('sha256');
const Secp256k1 = require('secp256k1');
const RIPEMD160 = require('ripemd160');
const _ = require('lodash');
const toBN = require('number-to-bn');
const crypto = require('crypto');
const { bytesToHex, hexToBytes } = require('./hex');

function aminoPrefix(name) {
  const a = Sha256(name);
  let b = hexToBytes(a);
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
  let prefixBytes = aminoPrefix(prefix);
  prefixBytes = Buffer.from(prefixBytes.concat(message.length));
  prefixBytes = Buffer.concat([prefixBytes, message]);
  return prefixBytes;
}

function getAddress(_publicKey) {
  let publicKey = _publicKey;
  if (publicKey.length > 33) {
    publicKey = publicKey.slice(5, publicKey.length);
  }
  const hmac = Sha256(publicKey);
  const b = Buffer.from(hexToBytes(hmac));
  const addr = new RIPEMD160().update(b);

  return addr.digest('hex').toUpperCase();
}

function importPrivateKey(secretKey) {
  const secretBytes = Buffer.from(secretKey, 'hex');
  const pubKey = Secp256k1.publicKeyCreate(secretBytes);

  return {
    address: getAddress(pubKey),
    privateKey: secretKey,
    publicKey: bytesToHex(pubKey),
  };
}

function sign(privateKey, msgJson) {
  // console.log('cosmos msgJson', JSON.stringify(sortObject(JSON.parse(msgJson))));
  const hash = crypto
    .createHash('sha256')
    .update(JSON.stringify(sortObject(JSON.parse(msgJson))))
    .digest('hex');
  const buf = Buffer.from(hash, 'hex');
  const prikeyArr = Buffer.from(new Uint8Array(hexToBytes(privateKey)));
  const signObj = Secp256k1.sign(buf, prikeyArr);
  return Array.from(signObj.signature);

  // Alternative way:
  // const sigByte = Buffer.from(JSON.stringify(sortObject(JSON.parse(msgJson))));
  // const sig32 = Buffer.from(Sha256(sigByte, {
  //   asBytes: true
  // }));
  // const prikeyArr = Buffer.from(new Uint8Array(hexToBytes(privateKey)));
  // const sig = Secp256k1.sign(sig32, prikeyArr);
  // return Array.from(sig.signature);
}

function weiToDecimals(_wei, _decimals) {
  let wei = _wei;
  const decimals = _decimals;

  const zero = toBN(0);
  const negative1 = toBN(-1);

  const negative = toBN(wei.toString(10), 10).lt(zero); // eslint-disable-line
  const baseLength = (10 ** decimals).toString().length - 1 || 1;
  const decimalsBN = toBN((10 ** decimals).toString(10), 10);

  if (negative) {
    wei = toBN(wei.toString(10), 10).mul(negative1);
  }

  let fraction = toBN(wei.toString(10), 10)
    .mod(decimalsBN)
    .toString(10); // eslint-disable-line

  while (fraction.length < baseLength) {
    fraction = `0${fraction}`;
  }

  fraction = fraction.match(/^([0-9]*[1-9]|0)(0*)/)[1]; // eslint-disable-line

  const whole = toBN(wei.toString(10), 10)
    .div(decimalsBN)
    .toString(10); // eslint-disable-line

  let value = '' + whole + (fraction == '0' ? '' : '.' + fraction); // eslint-disable-line

  if (negative) {
    value = `-${value}`;
  }

  return _.trim(value, '.');
}

function sortObject(obj) {
  if (obj === null) return null;
  if (typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(sortObject);
  const sortedKeys = Object.keys(obj).sort();
  const result = {};
  sortedKeys.forEach(key => {
    result[key] = sortObject(obj[key]);
  });
  return result;
}

module.exports = {
  marshalBinary,
  hexToBytes,
  sign,
  importPrivateKey,
  weiToDecimals,
  sortObject,
};
