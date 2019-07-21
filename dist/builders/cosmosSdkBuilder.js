"use strict";

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _codec = _interopRequireDefault(require("../codec"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _ = require('lodash');

var _require = require('../types/tx'),
    MsgSend = _require.MsgSend;

var _require2 = require('../types/base'),
    Fee = _require2.Fee,
    StdTx = _require2.StdTx,
    Signature = _require2.Signature,
    Coin = _require2.Coin,
    PubKeySecp256k1 = _require2.PubKeySecp256k1,
    MsgForSign = _require2.MsgForSign;

var _require3 = require('../utils/hex'),
    hexToBytes = _require3.hexToBytes,
    arrToHex = _require3.arrToHex;

var _require4 = require('../utils/bech32'),
    bech32ToAddress = _require4.bech32ToAddress;

var _require5 = require('../utils/common'),
    sign = _require5.sign;

var CosmosSdkBuilder =
/*#__PURE__*/
function () {
  function CosmosSdkBuilder() {
    _classCallCheck(this, CosmosSdkBuilder);

    _defineProperty(this, "codec", void 0);

    this.codec = new _codec.default();
    this.codec.applyTendermint();
    this.codec.applyCosmos();
  }

  _createClass(CosmosSdkBuilder, [{
    key: "setCodec",
    value: function setCodec(codec) {
      this.codec = codec;
    }
  }, {
    key: "getFee",
    value: function getFee(options) {
      return new Fee([new Coin(options.fee.denom, options.fee.amount)], '200000');
    }
  }, {
    key: "getMessageForSign",
    value: function getMessageForSign(options, data) {
      var account = options.account,
          memo = options.memo;
      var msgs = data.msgs,
          fee = data.fee;
      return new MsgForSign(options.chainId.toString(), account.accountNumber.toString(), account.sequence.toString(), fee, msgs, memo);
    }
  }, {
    key: "getSignature",
    value: function getSignature(options, signedBytes) {
      return new Signature(new PubKeySecp256k1(hexToBytes(bech32ToAddress(options.account.publicKey))), signedBytes);
    }
  }, {
    key: "getResultTx",
    value: function getResultTx(options, data) {
      var memo = options.memo;
      var msgs = data.msgs,
          fee = data.fee,
          sigs = data.sigs;
      return new StdTx(msgs, fee, sigs, memo);
    }
  }, {
    key: "signMessageJson",
    value: function signMessageJson(options, messageJson) {
      return sign(options.account.privateKey, messageJson);
    }
  }, {
    key: "abstractRequest",
    value: function abstractRequest(options, msg) {
      if (_.isUndefined(options.memo) || _.isNull(options.memo)) {
        options.memo = '';
      }

      var fee = this.getFee(options);
      var msgForSign = this.getMessageForSign(options, {
        msgs: [msg],
        fee: fee
      });
      var signedBytes = this.signMessageJson(options, this.codec.marshalJson(msgForSign));
      var sig = this.getSignature(options, signedBytes);
      var stdTx = this.getResultTx(options, {
        msgs: [msg],
        sigs: [sig],
        fee: fee
      });
      var json = this.codec.marshalJson(stdTx);
      var hex = arrToHex(this.codec.marshalBinary(stdTx));

      if (!_.isString(hex)) {
        hex = hex.toString('base64');
      }

      return {
        json: json,
        hex: hex
      };
    }
  }, {
    key: "sendRequest",
    value: function sendRequest(sendOptions) {
      var account = sendOptions.account;
      var coin = new Coin(sendOptions.denom, sendOptions.amount.toString()); // hexToBytes(bech32ToAddress())

      var msg = new MsgSend(account.address, sendOptions.to, [coin]);
      return this.abstractRequest(sendOptions, msg);
    }
  }, {
    key: "setMethod",
    value: function setMethod(methodName, func) {
      this[methodName] = func;
    }
  }, {
    key: "callMethod",
    value: function callMethod(methodName) {
      return this[methodName].bind(this);
    }
  }]);

  return CosmosSdkBuilder;
}();

exports.default = CosmosSdkBuilder;
//# sourceMappingURL=cosmosSdkBuilder.js.map