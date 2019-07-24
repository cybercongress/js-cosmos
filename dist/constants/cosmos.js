require("core-js/modules/es.object.define-property");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NetConfig = function NetConfig() {
  "use strict";

  _classCallCheck(this, NetConfig);
};

_defineProperty(NetConfig, "MAXGAS", void 0);

_defineProperty(NetConfig, "PREFIX_BECH32_ACCADDR", void 0);

_defineProperty(NetConfig, "PREFIX_BECH32_ACCPUB", void 0);

_defineProperty(NetConfig, "ENCODING_BECH32", void 0);

_defineProperty(NetConfig, "ENCODING_HEX", void 0);

_defineProperty(NetConfig, "DEFAULT_ENCODING", void 0);

NetConfig.MAXGAS = 200000;
NetConfig.PREFIX_BECH32_ACCADDR = 'cosmos';
NetConfig.PREFIX_BECH32_ACCPUB = 'cosmospub';
NetConfig.ENCODING_BECH32 = 'bech32';
NetConfig.ENCODING_HEX = 'hex';
NetConfig.DEFAULT_ENCODING = NetConfig.ENCODING_BECH32;

var AminoKey = function AminoKey() {
  "use strict";

  _classCallCheck(this, AminoKey);
};

_defineProperty(AminoKey, "BIP44Prefix", void 0);

_defineProperty(AminoKey, "FullFundraiserPath", void 0);

AminoKey.BIP44Prefix = "44'/118'/";
AminoKey.FullFundraiserPath = "".concat(AminoKey.BIP44Prefix, "0'/0/0");
module.exports = {
  NetConfig: NetConfig,
  AminoKey: AminoKey
};
//# sourceMappingURL=cosmos.js.map