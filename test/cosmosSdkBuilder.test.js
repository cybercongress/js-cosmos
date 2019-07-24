const assert = require('assert');

const constants = require('../src/constants/cosmos');
const encoding = require('../src/utils/encoding');
import CosmosSdkBuilder from '../src/builders/cosmosSdkBuilder';

describe("cosmosSdkBuilder", function () {
  it("should generate correct transaction", async () => {
    const fromAddress = 'cosmos1adfp4t779mz5mqkp774l4d0umm2x9v4s42prxw';
    const fromPrivateKey = 'a5b1305ebf29997a8a180b8bf322bc27b226e8cd00e243887e2129839c36bb2d';

    const toAddress = 'cosmos14mgwf74me9jneaj7pxna873ufrqdwzes2vt4kl';
    const amount = 1 * 10 ** 6;
    const keyPair = encoding(constants.NetConfig).importAccount(fromPrivateKey);

    const requestData = {
      account: {
        address: keyPair.address,
        publicKey: keyPair.publicKey,
        privateKey: keyPair.privateKey,
        accountNumber: '0',
        sequence: 0,
      },
      chainId: 'cosmoshub-2',
      amount,
      from: fromAddress,
      to: toAddress,
      denom: 'uatom',
      fee: {
        denom: 'uatom',
        amount: '500',
      },
      memo: '',
    };

    const cosmosBuilder = new CosmosSdkBuilder();

    const txRequest = cosmosBuilder.sendRequest(requestData);

    assert.equal(txRequest.json, '{"msg":[{"type":"cosmos-sdk/MsgSend","value":{"from_address":"cosmos1adfp4t779mz5mqkp774l4d0umm2x9v4s42prxw","to_address":"cosmos14mgwf74me9jneaj7pxna873ufrqdwzes2vt4kl","amount":[{"denom":"uatom","amount":"1000000"}]}}],"fee":{"amount":[{"denom":"uatom","amount":"500"}],"gas":"200000"},"signatures":[{"pub_key":{"type":"tendermint/PubKeySecp256k1","value":"A4qhBde8fvy8o3sU68PDS9NX8pF+czSANG46W+1cUKNW"},"signature":"YdNb+wRfb9bEjQj7+N/b9T3P8Gvi78acfBetkB+2vcE1JD2buS8UXlESfcACsPWYYw1FLznkL7yD64ltA/PJ2g=="}],"memo":""}');

    assert.equal(txRequest.hex, '0xfa010a74a8a3619a0a2d636f736d6f73316164667034743737396d7a356d716b703737346c346430756d6d327839763473343270727877122d636f736d6f7331346d67776637346d65396a6e65616a3770786e613837337566727164777a6573327674346b6c1a100a057561746f6d12073130303030303012160a0c0a057561746f6d120335303012063230303030301a6a0a26eb5ae98721038aa105d7bc7efcbca37b14ebc3c34bd357f2917e733480346e3a5bed5c50a356124061d35bfb045f6fd6c48d08fbf8dfdbf53dcff06be2efc69c7c17ad901fb6bdc135243d9bb92f145e51127dc002b0f598630d452f39e42fbc83eb896d03f3c9da');
  });
});
