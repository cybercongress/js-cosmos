const { Codec } = require('js-amino');

const { PubKeySecp256k1 } = require('./types/base');

const { MsgMultiSend, MsgSend } = require('./types/tx');

export default class CosmosCodec {
  codec;

  constructor() {
    this.codec = new Codec();
  }

  applyTendermint() {
    this.codec.registerConcrete(new PubKeySecp256k1(), 'tendermint/PubKeySecp256k1', {});
  }

  applyCosmos() {
    this.codec.registerConcrete(new MsgSend(), 'cosmos-sdk/MsgSend', {});
    this.codec.registerConcrete(new MsgMultiSend(), 'cosmos-sdk/MsgMultiSend', {});
  }

  getInstance() {
    return this.codec;
  }

  registerConcrete(instance, type, opts) {
    return this.codec.registerConcrete(instance, type, opts);
  }

  marshalJson(val) {
    return this.codec.marshalJson(val);
  }

  marshalBinary(val) {
    return this.codec.marshalBinary(val);
  }
};
// codec.registerConcrete(new StdTx(), 'auth/StdTx', {});

// codec.registerConcrete(new SignatureSecp256k1(), "tendermint/SigSecp256k1", {});
// codec.registerConcrete(new BasicSignature(), "tendermint/BasicSig", {})
// codec.registerConcrete(new Signature(), "tendermint/AuthSig", {})
