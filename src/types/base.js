const { TypeFactory, Types } = require('js-amino');

const StdTx = TypeFactory.create('StdTx', [
  {
    name: 'msg',
    type: Types.ArrayInterface,
  },
  {
    name: 'fee',
    type: Types.Struct,
  },
  {
    name: 'signatures',
    type: Types.ArrayStruct,
  },
  {
    name: 'memo',
    type: Types.String,
  },
]);

const Coin = TypeFactory.create('coin', [
  {
    name: 'denom',
    type: Types.String,
  },
  {
    name: 'amount',
    type: Types.String,
  },
]);

const Input = TypeFactory.create('input', [
  {
    name: 'address',
    type: Types.String,
  },
  {
    name: 'coins',
    type: Types.ArrayStruct,
  },
]);

const Output = TypeFactory.create('output', [
  {
    name: 'address',
    type: Types.String,
  },
  {
    name: 'coins',
    type: Types.ArrayStruct,
  },
]);

const Fee = TypeFactory.create('fee', [
  {
    name: 'amount',
    type: Types.ArrayStruct,
  },
  {
    name: 'gas',
    type: Types.String,
  },
]);

const PubKeySecp256k1 = TypeFactory.create(
  'PubKeySecp256k1',
  [
    {
      name: 's',
      type: Types.ByteSlice,
    },
  ],
  Types.ByteSlice
);

const Signature = TypeFactory.create('signature', [
  {
    name: 'pub_key',
    type: Types.Interface,
  },
  {
    name: 'signature',
    type: Types.ByteSlice,
  },
]);

const MsgForSign = TypeFactory.create('MsgForSign', [
  {
    name: 'chain_id',
    type: Types.String,
  },
  {
    name: 'account_number',
    type: Types.String,
  },
  {
    name: 'sequence',
    type: Types.String,
  },
  {
    name: 'fee',
    type: Types.Struct,
  },
  {
    name: 'msgs',
    type: Types.ArrayInterface,
  },
  {
    name: 'memo',
    type: Types.String,
  },
]);

module.exports = {
  Coin,
  Input,
  Output,
  Fee,
  Signature,
  StdTx,
  PubKeySecp256k1,
  MsgForSign,
};
