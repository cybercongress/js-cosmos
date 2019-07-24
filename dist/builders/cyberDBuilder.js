"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cosmosSdkBuilder = _interopRequireDefault(require("./cosmosSdkBuilder"));

var _codec = _interopRequireDefault(require("../codec"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../types/base'),
    Coin = _require.Coin,
    Input = _require.Input,
    Output = _require.Output;

var _require2 = require('../types/tx'),
    MsgMultiSend = _require2.MsgMultiSend;

var _require3 = require('../types/cyberd'),
    CyberDTxRequest = _require3.CyberDTxRequest,
    CyberDFee = _require3.CyberDFee,
    CyberDSignature = _require3.CyberDSignature,
    CyberDMsgLink = _require3.CyberDMsgLink,
    CyberDMsgLinkData = _require3.CyberDMsgLinkData;

var _require4 = require('../utils/hex'),
    hexToBytes = _require4.hexToBytes;

var _require5 = require('../utils/bech32'),
    bech32ToAddress = _require5.bech32ToAddress;

var _require6 = require('../utils/common'),
    sign = _require6.sign;

var CyberDBuilder =
/*#__PURE__*/
function (_CosmosSdkBuilder) {
  _inherits(CyberDBuilder, _CosmosSdkBuilder);

  function CyberDBuilder() {
    var _this;

    _classCallCheck(this, CyberDBuilder);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CyberDBuilder).call(this));
    _this.codec = new _codec.default();

    _this.codec.registerConcrete(new CyberDMsgLink(), 'cyberd/Link', {});

    return _this;
  }

  _createClass(CyberDBuilder, [{
    key: "sendRequest",
    value: function sendRequest(sendOptions) {
      var account = sendOptions.account;
      var coin = new Coin(sendOptions.denom, sendOptions.amount.toString());
      var msg = new MsgMultiSend([new Input(account.address, [coin])], [new Output(sendOptions.to, [coin])]);
      return this.abstractRequest(sendOptions, msg);
    }
  }, {
    key: "linkRequest",
    value: function linkRequest(sendOptions) {
      var linkData = new CyberDMsgLinkData(sendOptions.fromCid, sendOptions.toCid);
      var msg = new CyberDMsgLink(sendOptions.account.address, [linkData]);
      return this.abstractRequest(sendOptions, msg);
    }
  }, {
    key: "getResultTx",
    value: function getResultTx(options, data) {
      var memo = options.memo;
      var msgs = data.msgs,
          fee = data.fee,
          sigs = data.sigs;
      return new CyberDTxRequest(msgs, fee, sigs, memo);
    }
  }, {
    key: "getFee",
    value: function getFee(options) {
      return new CyberDFee([new Coin(options.fee.denom, options.fee.amount)], 200000);
    }
  }, {
    key: "getSignature",
    value: function getSignature(options, signedBytes) {
      var account = options.account;
      return new CyberDSignature(Array.from(hexToBytes(bech32ToAddress(account.publicKey))), Array.from(signedBytes), account.accountNumber, account.sequence);
    }
  }, {
    key: "signMessageJson",
    value: function signMessageJson(options, messageJson) {
      var messageObj = JSON.parse(messageJson);
      messageObj.fee.gas = messageObj.fee.gas.toString();
      return sign(options.account.privateKey, JSON.stringify(messageObj));
    }
  }]);

  return CyberDBuilder;
}(_cosmosSdkBuilder.default);

exports.default = CyberDBuilder;
//# sourceMappingURL=cyberDBuilder.js.map