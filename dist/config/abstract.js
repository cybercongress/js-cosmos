"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NetEncodingEnum = exports.NetConfig = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NetConfig =
/*#__PURE__*/
function () {
  function NetConfig(_PREFIX_BECH32_ACCADDR, _PREFIX_BECH32_ACCPUB) {
    var _DEFAULT_ENCODING = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'bech32';

    _classCallCheck(this, NetConfig);

    _defineProperty(this, "PREFIX_BECH32_ACCADDR", void 0);

    _defineProperty(this, "PREFIX_BECH32_ACCPUB", void 0);

    _defineProperty(this, "DEFAULT_ENCODING", void 0);

    _defineProperty(this, "MAXGAS", 200000);

    _defineProperty(this, "DERIVATION_CHAIN_INDEX", '118');

    this.PREFIX_BECH32_ACCADDR = _PREFIX_BECH32_ACCADDR;
    this.PREFIX_BECH32_ACCPUB = _PREFIX_BECH32_ACCPUB;
    this.DEFAULT_ENCODING = _DEFAULT_ENCODING;
  }

  _createClass(NetConfig, [{
    key: "setMaxGas",
    value: function setMaxGas(_MAXGAS) {
      this.MAXGAS = _MAXGAS;
    }
  }, {
    key: "setDerivation",
    value: function setDerivation(_DERIVATION_CHAIN_INDEX) {
      this.DERIVATION_CHAIN_INDEX = _DERIVATION_CHAIN_INDEX;
    }
  }]);

  return NetConfig;
}();

exports.NetConfig = NetConfig;

var NetEncodingEnum = function NetEncodingEnum() {
  _classCallCheck(this, NetEncodingEnum);
};

exports.NetEncodingEnum = NetEncodingEnum;

_defineProperty(NetEncodingEnum, "BECH32", 'bech32');

_defineProperty(NetEncodingEnum, "HEX", 'hex');
//# sourceMappingURL=abstract.js.map