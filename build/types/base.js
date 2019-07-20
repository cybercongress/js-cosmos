var _require = require('js-amino'),
    TypeFactory = _require.TypeFactory,
    Types = _require.Types;

var StdTx = TypeFactory.create('StdTx', [{
  name: 'msg',
  type: Types.ArrayInterface
}, {
  name: 'fee',
  type: Types.Struct
}, {
  name: 'signatures',
  type: Types.ArrayStruct
}, {
  name: 'memo',
  type: Types.String
}]);
var Coin = TypeFactory.create('coin', [{
  name: 'denom',
  type: Types.String
}, {
  name: 'amount',
  type: Types.String
}]);
var Input = TypeFactory.create('input', [{
  name: 'address',
  type: Types.String
}, {
  name: 'coins',
  type: Types.ArrayStruct
}]);
var Output = TypeFactory.create('output', [{
  name: 'address',
  type: Types.String
}, {
  name: 'coins',
  type: Types.ArrayStruct
}]);
var Fee = TypeFactory.create('fee', [{
  name: 'amount',
  type: Types.ArrayStruct
}, {
  name: 'gas',
  type: Types.String
}]);
var PubKeySecp256k1 = TypeFactory.create('PubKeySecp256k1', [{
  name: 's',
  type: Types.ByteSlice
}], Types.ByteSlice);
var Signature = TypeFactory.create('signature', [{
  name: 'pub_key',
  type: Types.Interface
}, {
  name: 'signature',
  type: Types.ByteSlice
}]);
var MsgForSign = TypeFactory.create('MsgForSign', [{
  name: 'chain_id',
  type: Types.String
}, {
  name: 'account_number',
  type: Types.String
}, {
  name: 'sequence',
  type: Types.String
}, {
  name: 'fee',
  type: Types.Struct
}, {
  name: 'msgs',
  type: Types.ArrayInterface
}, {
  name: 'memo',
  type: Types.String
}]);
module.exports = {
  Coin: Coin,
  Input: Input,
  Output: Output,
  Fee: Fee,
  Signature: Signature,
  StdTx: StdTx,
  PubKeySecp256k1: PubKeySecp256k1,
  MsgForSign: MsgForSign
};
//# sourceMappingURL=base.js.map