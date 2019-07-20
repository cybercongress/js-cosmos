const assert = require('assert');

const constants = require('../src/constants/cyberd');
const encoding = require('../src/utils/encoding');
import CyberDBuilder from '../src/builders/cyberDBuilder';

describe("cyberDBuilder", function () {
  it("should generate correct transaction", async () => {
    const fromAddress = 'cyber1adfp4t779mz5mqkp774l4d0umm2x9v4sjpxt05';
    const fromPrivateKey = 'a5b1305ebf29997a8a180b8bf322bc27b226e8cd00e243887e2129839c36bb2d';

    const toAddress = 'cyber14mgwf74me9jneaj7pxna873ufrqdwzesd8val9';
    const amount = 1 * 10 ** 9;
    const keyPair = encoding(constants.NetConfig).importAccount(fromPrivateKey);

    const requestData = {
      account: {
        address: keyPair.address,
        publicKey: keyPair.publicKey,
        privateKey: keyPair.privateKey,
        accountNumber: 0,
        sequence: 0,
      },
      chainId: 'euler-4',
      amount,
      from: fromAddress,
      to: toAddress,
      denom: 'cyb',
      fee: {
        denom: '',
        amount: '0',
      },
      memo: '',
    };

    const cyberDBuilder = new CyberDBuilder();

    const txRequest = cyberDBuilder.sendRequest(requestData);

    assert.equal(txRequest.json, '{"msgs":[{"inputs":[{"address":"cyber1adfp4t779mz5mqkp774l4d0umm2x9v4sjpxt05","coins":[{"denom":"cyb","amount":"1000000000"}]}],"outputs":[{"address":"cyber14mgwf74me9jneaj7pxna873ufrqdwzesd8val9","coins":[{"denom":"cyb","amount":"1000000000"}]}]}],"fee":{"amount":[{"denom":"","amount":"0"}],"gas":200000},"signatures":[{"pub_key":"A4qhBde8fvy8o3sU68PDS9NX8pF+czSANG46W+1cUKNW","signature":"dOCzOcBTUjCoNgbZaeeqigM0emQJiM+Ktv1SlQoOH25X2JX1zULEeTTaq/BDcczdFTvtKv/odtCSUVrQMKNLkg==","account_number":0,"sequence":0}],"memo":""}');

    assert.equal(txRequest.hex, '0xfb010a86010a410a2c6379626572316164667034743737396d7a356d716b703737346c346430756d6d3278397634736a707874303512110a03637962120a3130303030303030303012410a2c637962657231346d67776637346d65396a6e65616a3770786e613837337566727164777a6573643876616c3912110a03637962120a3130303030303030303012090a0312013010c09a0c1a650a21038aa105d7bc7efcbca37b14ebc3c34bd357f2917e733480346e3a5bed5c50a356124074e0b339c0535230a83606d969e7aa8a03347a640988cf8ab6fd52950a0e1f6e57d895f5cd42c47934daabf04371ccdd153bed2affe876d092515ad030a34b92');
  });
});
