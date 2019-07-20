import CosmosSdkRpc from './cosmosSdkRpc';
import CyberDBuilder from '../builders/cyberDBuilder';

const axios = require('axios');
const { stringToHex } = require('../utils/hex');

export default class CyberdRpc extends CosmosSdkRpc {
  cosmosBuilder;

  constructor(rpc, constants) {
    super(rpc, constants);
    this.cosmosBuilder = new CyberDBuilder();
  }
  async getNodeInfo() {
    return axios({
      method: 'get',
      url: `${this.rpc}/status`,
    }).then(response => response.data.result);
  }

  async getNetworkId() {
    return this.getNodeInfo().then(data => data.node_info.network);
  }

  async getBalance(address) {
    return axios({
      method: 'get',
      url: `${this.rpc}/account?address="${address}"`,
    }).then(response => (response.data.result ? response.data.result.account.coins[0].amount : 0));
  }

  async getBandwidth(address) {
    return axios({
      method: 'get',
      url: `${this.rpc}/account_bandwidth?address="${address}"`,
    }).then(response => (response.data.result ? { remained: response.data.result.remained, maxValue: response.data.result.max_value } : { error: 'unknown' }));
  }

  async search(keywordHash) {
    return axios({
      method: 'get',
      url: `${this.rpc}/search?cid=%22${keywordHash}%22&page=0&perPage=10`,
    }).then(response => (response.data.result ? response.data.result.cids : []));
  }

  async getAccountInfo(address) {
    const addressInfo = await axios({
      method: 'get',
      url: `${this.rpc}/account?address="${address}"`,
    });

    if (!addressInfo.data.result) {
      throw 'addressInfo.data.result undefined';
    }
    const account = addressInfo.data.result.account;
    if (!account) {
      throw 'addressInfo.data.result.account undefined';
    }
    return addressInfo.data.result.account;
  }

  prepareRequestData(txRequest) {
    const jsObject = JSON.parse(txRequest.json);
    jsObject.signatures.forEach(sign => {
      sign.pub_key = Array.from(Buffer.from(sign.pub_key, 'base64'));
      sign.signature = Array.from(Buffer.from(sign.signature, 'base64'));
    });
    txRequest.json = JSON.stringify(jsObject);

    return stringToHex(txRequest.json);
  }

  async transfer(txOptions, addressTo, gAmount) {
    const amount = parseFloat(gAmount) * 10 ** 9;
    
    const options = await this.prepareOptions(txOptions, {
      from: txOptions.address,
      to: addressTo,
      amount,
      denom: 'cyb',
      fee: {
        denom: '',
        amount: '0',
      }
    });

    const txRequest = this.cosmosBuilder.sendRequest(options);
    
    return this.handleResponse(axios({
      method: 'get',
      url: `${this.rpc}/submit_signed_send?data="${this.prepareRequestData(txRequest)}"`,
    }));
  }

  async link(txOptions, keywordHash, contentHash) {
    const options = await this.prepareOptions(txOptions, {
      fromCid: keywordHash,
      toCid: contentHash,
      fee: {
        denom: '',
        amount: '0',
      }
    });

    const txRequest = this.cosmosBuilder.linkRequest(options);

    return this.handleResponse(axios({
      method: 'get',
      url: `${this.rpc}/submit_signed_link?data="${this.prepareRequestData(txRequest)}"`,
    }));
  }
}
