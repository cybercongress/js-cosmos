const _ = require('lodash');
const { importPrivateKey } = require('./common');
const { isHex } = require('./hex');
const { addressToBech32 } = require('./bech32');

import { NetEncodingEnum } from '../config/abstract';

module.exports = function(config) {
  function encodeAccount(acc) {
    if (_.isEmpty(acc)) {
      return null;
    }

    switch (config.DEFAULT_ENCODING) {
      case NetEncodingEnum.BECH32: {
        if (isHex(acc.address)) {
          acc.address = addressToBech32(config.PREFIX_BECH32_ACCADDR, acc.address);
        }

        if (isHex(acc.publicKey)) {
          acc.publicKey = addressToBech32(config.PREFIX_BECH32_ACCPUB, acc.publicKey);
        }
        break;
      }
      default: {
      }
    }
    return acc;
  }

  function importAccount(privateKey) {
    const keyPair = importPrivateKey(privateKey);

    if (!keyPair) return null;

    return encodeAccount({
      address: keyPair.address,
      phrase: null,
      privateKey: keyPair.privateKey,
      publicKey: keyPair.publicKey,
    });
  }

  return {
    importAccount,
    encodeAccount,
  };
};
