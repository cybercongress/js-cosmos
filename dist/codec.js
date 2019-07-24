"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('js-amino'),
    Codec = _require.Codec;

var _require2 = require('./types/base'),
    PubKeySecp256k1 = _require2.PubKeySecp256k1;

var _require3 = require('./types/tx'),
    MsgMultiSend = _require3.MsgMultiSend,
    MsgSend = _require3.MsgSend;

var CosmosCodec =
/*#__PURE__*/
function () {
  function CosmosCodec() {
    _classCallCheck(this, CosmosCodec);

    _defineProperty(this, "codec", void 0);

    this.codec = new Codec();
  }

  _createClass(CosmosCodec, [{
    key: "applyTendermint",
    value: function applyTendermint() {
      this.codec.registerConcrete(new PubKeySecp256k1(), 'tendermint/PubKeySecp256k1', {});
    }
  }, {
    key: "applyCosmos",
    value: function applyCosmos() {
      this.codec.registerConcrete(new MsgSend(), 'cosmos-sdk/MsgSend', {});
      this.codec.registerConcrete(new MsgMultiSend(), 'cosmos-sdk/MsgMultiSend', {});
    }
  }, {
    key: "getInstance",
    value: function getInstance() {
      return this.codec;
    }
  }, {
    key: "registerConcrete",
    value: function registerConcrete(instance, type, opts) {
      return this.codec.registerConcrete(instance, type, opts);
    }
  }, {
    key: "marshalJson",
    value: function marshalJson(val) {
      return this.codec.marshalJson(val);
    }
  }, {
    key: "marshalBinary",
    value: function marshalBinary(val) {
      return this.codec.marshalBinary(val);
    }
  }]);

  return CosmosCodec;
}();

exports.default = CosmosCodec;
; // codec.registerConcrete(new StdTx(), 'auth/StdTx', {});
// codec.registerConcrete(new SignatureSecp256k1(), "tendermint/SigSecp256k1", {});
// codec.registerConcrete(new BasicSignature(), "tendermint/BasicSig", {})
// codec.registerConcrete(new Signature(), "tendermint/AuthSig", {})
//# sourceMappingURL=codec.js.map