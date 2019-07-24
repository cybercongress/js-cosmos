var _require = require('js-amino'),
    TypeFactory = _require.TypeFactory,
    Types = _require.Types;

var MsgSend = TypeFactory.create('MsgSend', [{
  name: 'from_address',
  type: Types.String
}, {
  name: 'to_address',
  type: Types.String
}, {
  name: 'amount',
  type: Types.ArrayStruct
}]);
var MsgMultiSend = TypeFactory.create('cosmos-sdk/MsgMultiSend', [{
  name: 'inputs',
  type: Types.ArrayStruct
}, {
  name: 'outputs',
  type: Types.ArrayStruct
}]);
module.exports = {
  MsgMultiSend: MsgMultiSend,
  MsgSend: MsgSend
};
//# sourceMappingURL=tx.js.map