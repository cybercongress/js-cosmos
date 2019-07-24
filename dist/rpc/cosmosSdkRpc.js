"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.parse-float");

require("core-js/modules/es.parse-int");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.split");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("regenerator-runtime/runtime");

var _cosmosSdkBuilder = _interopRequireDefault(require("../builders/cosmosSdkBuilder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var axios = require('axios');

var _require = require('../utils/common'),
    weiToDecimals = _require.weiToDecimals;

var encoding = require('../utils/encoding');

var CosmosSdkRpc =
/*#__PURE__*/
function () {
  function CosmosSdkRpc(rpc, constants) {
    _classCallCheck(this, CosmosSdkRpc);

    _defineProperty(this, "rpc", void 0);

    _defineProperty(this, "constants", void 0);

    _defineProperty(this, "cosmosBuilder", void 0);

    this.rpc = rpc;
    this.constants = constants;
    this.cosmosBuilder = new _cosmosSdkBuilder.default();
  }

  _createClass(CosmosSdkRpc, [{
    key: "getBalance",
    value: function () {
      var _getBalance = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(address) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", axios({
                  method: 'get',
                  url: "".concat(this.rpc, "/bank/balances/").concat(address)
                }).then(function (response) {
                  return response.data && response.data.length ? response.data[0].amount : 0;
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getBalance(_x) {
        return _getBalance.apply(this, arguments);
      }

      return getBalance;
    }()
  }, {
    key: "getMegaBalance",
    value: function () {
      var _getMegaBalance = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(address) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this.getBalance(address).then(function (cyb) {
                  cyb = weiToDecimals(cyb, 6);
                  var strSplit = cyb.toString().split('.');

                  if (strSplit.length === 1) {
                    return cyb;
                  }

                  return parseFloat("".concat(strSplit[0], ".").concat(strSplit[1].slice(0, 3)));
                }));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getMegaBalance(_x2) {
        return _getMegaBalance.apply(this, arguments);
      }

      return getMegaBalance;
    }()
  }, {
    key: "getGigaBalance",
    value: function () {
      var _getGigaBalance = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(address) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", this.getBalance(address).then(function (cyb) {
                  cyb = weiToDecimals(cyb, 9);
                  var strSplit = cyb.toString().split('.');

                  if (strSplit.length === 1) {
                    return cyb;
                  }

                  return parseFloat("".concat(strSplit[0], ".").concat(strSplit[1].slice(0, 3)));
                }));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getGigaBalance(_x3) {
        return _getGigaBalance.apply(this, arguments);
      }

      return getGigaBalance;
    }()
  }, {
    key: "getNodeInfo",
    value: function () {
      var _getNodeInfo = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", axios({
                  method: 'get',
                  url: "".concat(this.rpc, "/node_info")
                }).then(function (response) {
                  return response.data;
                }));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
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
      regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", this.getNodeInfo().then(function (data) {
                  return data.network;
                }));

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getNetworkId() {
        return _getNetworkId.apply(this, arguments);
      }

      return getNetworkId;
    }()
  }, {
    key: "getAccountInfo",
    value: function () {
      var _getAccountInfo = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(address) {
        var addressInfo;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return axios({
                  method: 'get',
                  url: "".concat(this.rpc, "/auth/accounts/").concat(address)
                });

              case 2:
                addressInfo = _context6.sent;

                if (addressInfo.data.value) {
                  _context6.next = 5;
                  break;
                }

                throw 'addressInfo.data.result undefined';

              case 5:
                return _context6.abrupt("return", addressInfo.data.value);

              case 6:
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
    key: "prepareOptions",
    value: function () {
      var _prepareOptions = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(txOptions, msgOptions) {
        var chainId, account, keyPair;
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
                keyPair = encoding(this.constants.NetConfig).importAccount(txOptions.privateKey);
                return _context7.abrupt("return", _.extend({
                  account: {
                    address: keyPair.address,
                    publicKey: keyPair.publicKey,
                    privateKey: keyPair.privateKey,
                    accountNumber: account.account_number.toString(),
                    sequence: parseInt(account.sequence, 10)
                  },
                  chainId: chainId,
                  fee: {
                    denom: 'uatom',
                    amount: '500'
                  },
                  memo: ''
                }, msgOptions || {}));

              case 8:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function prepareOptions(_x5, _x6) {
        return _prepareOptions.apply(this, arguments);
      }

      return prepareOptions;
    }()
  }, {
    key: "handleResponse",
    value: function handleResponse(requestPromise) {
      return requestPromise.then(function (res) {
        if (!res.data) {
          throw new Error('Empty data');
        }

        if (res.data.error) {
          throw res.data.error;
        }

        return res.data;
      }).catch(function (error) {
        console.error('Tx error', error);
        throw error;
      });
    }
  }, {
    key: "transfer",
    value: function () {
      var _transfer = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(txOptions, addressTo, mAmount) {
        var amount, options, txRequest;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                amount = parseFloat(mAmount) * Math.pow(10, 6);
                _context8.next = 3;
                return this.prepareOptions(txOptions, {
                  from: txOptions.address,
                  to: addressTo,
                  amount: amount,
                  denom: 'uatom'
                });

              case 3:
                options = _context8.sent;
                txRequest = this.cosmosBuilder.sendRequest(options);
                return _context8.abrupt("return", this.handleResponse(axios.post("".concat(this.rpc, "/txs"), {
                  tx: JSON.parse(txRequest.json),
                  mode: 'sync'
                })));

              case 6:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function transfer(_x7, _x8, _x9) {
        return _transfer.apply(this, arguments);
      }

      return transfer;
    }()
  }]);

  return CosmosSdkRpc;
}();

exports.default = CosmosSdkRpc;
//# sourceMappingURL=cosmosSdkRpc.js.map