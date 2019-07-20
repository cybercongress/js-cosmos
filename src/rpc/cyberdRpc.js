import CosmosSdkRpc from './cosmosSdkRpc';
import CyberDBuilder from '../builders/cyberDBuilder';

const axios = require('axios');
const encoding = require('../utils/encoding');
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
    const chainId = await this.getNetworkId();
    const account = await this.getAccountInfo(txOptions.address);

    const amount = parseFloat(gAmount) * 10 ** 9;

    const keyPair = encoding(this.constants.NetConfig).importAccount(txOptions.privateKey);

    const requestData = {
      account: {
        address: keyPair.address,
        publicKey: keyPair.publicKey,
        privateKey: keyPair.privateKey,
        accountNumber: parseInt(account.account_number, 10),
        sequence: parseInt(account.sequence, 10),
      },
      chainId,
      amount,
      to: addressTo,
      denom: 'cyb',
      fee: {
        denom: '',
        amount: '0',
      },
      memo: '',
    };

    const txRequest = this.cosmosBuilder.sendRequest(requestData);

    return axios({
      method: 'get',
      url: `${this.rpc}/submit_signed_send?data="${this.prepareRequestData(txRequest)}"`,
    })
      .then(res => {
        if (!res.data) {
          throw new Error('Empty data');
        }
        if (res.data.error) {
          throw res.data.error;
        }
        return res.data;
      })
      .catch(error => {
        console.error('Transfer error', error);
        throw error;
      });
  }

  async link(txOptions, keywordHash, contentHash) {
    const chainId = await this.getNetworkId();
    const account = await this.getAccountInfo(txOptions.address);

    const keyPair = encoding(this.constants.NetConfig).importAccount(txOptions.privateKey);

    const requestData = {
      account: {
        address: keyPair.address,
        publicKey: keyPair.publicKey,
        privateKey: keyPair.privateKey,
        accountNumber: parseInt(account.account_number, 10),
        sequence: parseInt(account.sequence, 10),
      },
      fee: {
        denom: '',
        amount: '0',
      },
      chainId,
      fromCid: keywordHash,
      toCid: contentHash,
      memo: '',
    };

    const txRequest = this.cosmosBuilder.linkRequest(requestData);

    return axios({
      method: 'get',
      url: `${this.rpc}/submit_signed_link?data="${this.prepareRequestData(txRequest)}"`,
    })
      .then(res => {
        if (!res.data) {
          throw new Error('Empty data');
        }
        if (res.data.error) {
          throw res.data.error;
        }
        return res.data;
      })
      .catch(error => {
        console.error('Link error', error);
        throw error;
      });
  }
}
