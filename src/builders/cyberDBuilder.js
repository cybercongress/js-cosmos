import CosmosSdkBuilder from './cosmosSdkBuilder';

import CosmosCodec from '../codec';

const { Coin, Input, Output } = require('../types/base');
const { MsgMultiSend } = require('../types/tx');
const { CyberDTxRequest, CyberDFee, CyberDSignature, CyberDMsgLink, CyberDMsgLinkData } = require('../types/cyberd');

const { hexToBytes } = require('../utils/hex');

const { bech32ToAddress } = require('../utils/bech32');

const { sign } = require('../utils/common');

export default class CyberDBuilder extends CosmosSdkBuilder {
  constructor() {
    super();
    this.codec = new CosmosCodec();
    this.codec.registerConcrete(new CyberDMsgLink(), 'cyberd/Link', {});
  }

  sendRequest(sendOptions) {
    const { account } = sendOptions;
    const coin = new Coin(sendOptions.denom, sendOptions.amount.toString());

    const msg = new MsgMultiSend([new Input(account.address, [coin])], [new Output(sendOptions.to, [coin])]);

    return this.abstractRequest(sendOptions, msg);
  }

  linkRequest(sendOptions) {
    const linkData = new CyberDMsgLinkData(sendOptions.fromCid, sendOptions.toCid);
    const msg = new CyberDMsgLink(sendOptions.account.address, [linkData]);
    return this.abstractRequest(sendOptions, msg);
  }

  getResultTx(options, data) {
    const { memo } = options;
    const { msgs, fee, sigs } = data;
    return new CyberDTxRequest(msgs, fee, sigs, memo);
  }

  getFee(options) {
    return new CyberDFee([new Coin(options.fee.denom, options.fee.amount)], 200000);
  }

  getSignature(options, signedBytes) {
    const { account } = options;
    return new CyberDSignature(Array.from(hexToBytes(bech32ToAddress(account.publicKey))), Array.from(signedBytes), parseInt(account.accountNumber), account.sequence);
  }

  signMessageJson(options, messageJson) {
    const messageObj = JSON.parse(messageJson);
    messageObj.fee.gas = messageObj.fee.gas.toString();
    return sign(options.account.privateKey, JSON.stringify(messageObj));
  }
}
