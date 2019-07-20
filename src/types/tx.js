const { TypeFactory, Types } = require('js-amino');

const MsgSend = TypeFactory.create('MsgSend', [
  {
    name: 'from_address',
    type: Types.String,
  },
  {
    name: 'to_address',
    type: Types.String,
  },
  {
    name: 'amount',
    type: Types.ArrayStruct,
  },
]);

const MsgMultiSend = TypeFactory.create('cosmos-sdk/MsgMultiSend', [
  {
    name: 'inputs',
    type: Types.ArrayStruct,
  },
  {
    name: 'outputs',
    type: Types.ArrayStruct,
  },
]);

module.exports = {
  MsgMultiSend,
  MsgSend,
};
