"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.parse-float");

require("core-js/modules/es.parse-int");

require("core-js/modules/es.promise");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("regenerator-runtime/runtime");

var _cosmosSdkRpc = _interopRequireDefault(require("./cosmosSdkRpc"));

var _cyberDBuilder = _interopRequireDefault(require("../builders/cyberDBuilder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var axios = require('axios');

var encoding = require('../utils/encoding');

var _require = require('../utils/hex'),
    stringToHex = _require.stringToHex;

var CyberdRpc =
/*#__PURE__*/
function (_CosmosSdkRpc) {
  _inherits(CyberdRpc, _CosmosSdkRpc);

  function CyberdRpc(rpc, constants) {
    var _this;

    _classCallCheck(this, CyberdRpc);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CyberdRpc).call(this, rpc, constants));

    _defineProperty(_assertThisInitialized(_this), "cosmosBuilder", void 0);

    _this.cosmosBuilder = new _cyberDBuilder.default();
    return _this;
  }

  _createClass(CyberdRpc, [{
    key: "getNodeInfo",
    value: function () {
      var _getNodeInfo = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", axios({
                  method: 'get',
                  url: "".concat(this.rpc, "/status")
                }).then(function (response) {
                  return response.data.result;
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getNodeInfo() {
        return _getNodeInfo.apply(this, arguments);
      }

      return getNodeInfo;
    }()
  }, {
    key: "getNetworkId",
    value: function () {
      var _getNetworkId = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this.getNodeInfo().then(function (data) {
                  return data.node_info.network;
                }));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getNetworkId() {
        return _getNetworkId.apply(this, arguments);
      }

      return getNetworkId;
    }()
  }, {
    key: "getBalance",
    value: function () {
      var _getBalance = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(address) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", axios({
                  method: 'get',
                  url: "".concat(this.rpc, "/account?address=\"").concat(address, "\"")
                }).then(function (response) {
                  return response.data.result ? response.data.result.account.coins[0].amount : 0;
                }));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getBalance(_x) {
        return _getBalance.apply(this, arguments);
      }

      return getBalance;
    }()
  }, {
    key: "getBandwidth",
    value: function () {
      var _getBandwidth = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(address) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", axios({
                  method: 'get',
                  url: "".concat(this.rpc, "/account_bandwidth?address=\"").concat(address, "\"")
                }).then(function (response) {
                  return response.data.result ? {
                    remained: response.data.result.remained,
                    maxValue: response.data.result.max_value
                  } : {
                    error: 'unknown'
                  };
                }));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getBandwidth(_x2) {
        return _getBandwidth.apply(this, arguments);
      }

      return getBandwidth;
    }()
  }, {
    key: "search",
    value: function () {
      var _search = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(keywordHash) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", axios({
                  method: 'get',
                  url: "".concat(this.rpc, "/search?cid=%22").concat(keywordHash, "%22&page=0&perPage=10")
                }).then(function (response) {
                  return response.data.result ? response.data.result.cids : [];
                }));

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function search(_x3) {
        return _search.apply(this, arguments);
      }

      return search;
    }()
  }, {
    key: "getAccountInfo",
    value: function () {
      var _getAccountInfo = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(address) {
        var addressInfo, account;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return axios({
                  method: 'get',
                  url: "".concat(this.rpc, "/account?address=\"").concat(address, "\"")
                });

              case 2:
                addressInfo = _context6.sent;

                if (addressInfo.data.result) {
                  _context6.next = 5;
                  break;
                }

                throw 'addressInfo.data.result undefined';

              case 5:
                account = addressInfo.data.result.account;

                if (account) {
                  _context6.next = 8;
                  break;
                }

                throw 'addressInfo.data.result.account undefined';

              case 8:
                return _context6.abrupt("return", addressInfo.data.result.account);

              case 9:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getAccountInfo(_x4) {
        return _getAccountInfo.apply(this, arguments);
      }

      return getAccountInfo;
    }()
  }, {
    key: "prepareRequestData",
    value: function prepareRequestData(txRequest) {
      var jsObject = JSON.parse(txRequest.json);
      jsObject.signatures.forEach(function (sign) {
        sign.pub_key = Array.from(Buffer.from(sign.pub_key, 'base64'));
        sign.signature = Array.from(Buffer.from(sign.signature, 'base64'));
      });
      txRequest.json = JSON.stringify(jsObject);
      return stringToHex(txRequest.json);
    }
  }, {
    key: "transfer",
    value: function () {
      var _transfer = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(txOptions, addressTo, gAmount) {
        var chainId, account, amount, keyPair, requestData, txRequest;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.getNetworkId();

              case 2:
                chainId = _context7.sent;
                _context7.next = 5;
                return this.getAccountInfo(txOptions.address);

              case 5:
                account = _context7.sent;
                amount = parseFloat(gAmount) * Math.pow(10, 9);
                keyPair = encoding(this.constants.NetConfig).importAccount(txOptions.privateKey);
                requestData = {
                  account: {
                    address: keyPair.address,
                    publicKey: keyPair.publicKey,
                    privateKey: keyPair.privateKey,
                    accountNumber: parseInt(account.account_number, 10),
                    sequence: parseInt(account.sequence, 10)
                  },
                  chainId: chainId,
                  amount: amount,
                  to: addressTo,
                  denom: 'cyb',
                  fee: {
                    denom: '',
                    amount: '0'
                  },
                  memo: ''
                };
                txRequest = this.cosmosBuilder.sendRequest(requestData);
                return _context7.abrupt("return", axios({
                  method: 'get',
                  url: "".concat(this.rpc, "/submit_signed_send?data=\"").concat(this.prepareRequestData(txRequest), "\"")
                }).then(function (res) {
                  if (!res.data) {
                    throw new Error('Empty data');
                  }

                  if (res.data.error) {
                    throw res.data.error;
                  }

                  return res.data;
                }).catch(function (error) {
                  console.error('Transfer error', error);
                  throw error;
                }));

              case 11:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function transfer(_x5, _x6, _x7) {
        return _transfer.apply(this, arguments);
      }

      return transfer;
    }()
  }, {
    key: "link",
    value: function () {
      var _link = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(txOptions, keywordHash, contentHash) {
        var chainId, account, keyPair, requestData, txRequest;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.getNetworkId();

              case 2:
                chainId = _context8.sent;
                _context8.next = 5;
                return this.getAccountInfo(txOptions.address);

              case 5:
                account = _context8.sent;
                keyPair = encoding(this.constants.NetConfig).importAccount(txOptions.privateKey);
                requestData = {
                  account: {
                    address: keyPair.address,
                    publicKey: keyPair.publicKey,
                    privateKey: keyPair.privateKey,
                    accountNumber: parseInt(account.account_number, 10),
                    sequence: parseInt(account.sequence, 10)
                  },
                  fee: {
                    denom: '',
                    amount: '0'
                  },
                  chainId: chainId,
                  fromCid: keywordHash,
                  toCid: contentHash,
                  memo: ''
                };
                txRequest = this.cosmosBuilder.linkRequest(requestData);
                return _context8.abrupt("return", axios({
                  method: 'get',
                  url: "".concat(this.rpc, "/submit_signed_link?data=\"").concat(this.prepareRequestData(txRequest), "\"")
                }).then(function (res) {
                  if (!res.data) {
                    throw new Error('Empty data');
                  }

                  if (res.data.error) {
                    throw res.data.error;
                  }

                  return res.data;
                }).catch(function (error) {
                  console.error('Link error', error);
                  throw error;
                }));

              case 10:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function link(_x8, _x9, _x10) {
        return _link.apply(this, arguments);
      }

      return link;
    }()
  }]);

  return CyberdRpc;
}(_cosmosSdkRpc.default);

exports.default = CyberdRpc;
//# sourceMappingURL=cyberdRpc.js.map