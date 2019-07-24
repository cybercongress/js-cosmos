"use strict";

var _abstract = require("../config/abstract");

var _ = require('lodash');

var _require = require('./common'),
    importPrivateKey = _require.importPrivateKey;

var _require2 = require('./hex'),
    isHex = _require2.isHex;

var _require3 = require('./bech32'),
    addressToBech32 = _require3.addressToBech32;

module.exports = function (config) {
  function encodeAccount(acc) {
    if (_.isEmpty(acc)) {
      return null;
    }

    switch (config.DEFAULT_ENCODING) {
      case _abstract.NetEncodingEnum.BECH32:
        {
          if (isHex(acc.address)) {
            acc.address = addressToBech32(config.PREFIX_BECH32_ACCADDR, acc.address);
          }

          if (isHex(acc.publicKey)) {
            acc.publicKey = addressToBech32(config.PREFIX_BECH32_ACCPUB, acc.publicKey);
          }

          break;
        }

      default:
        {}
    }

    return acc;
  }

  function importAccount(privateKey) {
    var keyPair = importPrivateKey(privateKey);
    if (!keyPair) return null;
    return encodeAccount({
      address: keyPair.address,
      phrase: null,
      privateKey: keyPair.privateKey,
      publicKey: keyPair.publicKey
    });
  }

  return {
    importAccount: importAccount,
    encodeAccount: encodeAccount
  };
};
//# sourceMappingURL=encoding.js.map