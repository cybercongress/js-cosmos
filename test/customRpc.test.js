const assert = require('assert');

import CosmosSdkBuilder from '../src/builders/cosmosSdkBuilder';
import CosmosCodec from '../src/codec';

import CosmosSdkRpc from '../src/rpc/cosmosSdkRpc';
import {NetConfig} from '../src/config/abstract';

const { TypeFactory, Types } = require('js-amino');

describe("cosmosRpc", function () {
  it("should handle custom builder and custom rpc correctly", async () => {

    const CustomMessage = TypeFactory.create('CustomMessage', [
      {
        name: 'custom_address',
        type: Types.String,
      },
      {
        name: 'custom_amount',
        type: Types.String,
      },
    ]);


    class MyCustomChainBuilder extends CosmosSdkBuilder {
      constructor() {
        super();
        // redefine codec for clear parent types and use only new types if you need
        this.codec = new CosmosCodec();
        this.codec.registerConcrete(new CustomMessage(), 'my-custom-chain/custom-message', {});
      }

      myCustomRequest(sendOptions) {
        const msg = new CustomMessage(sendOptions.customAddress, sendOptions.customAmount);
        return this.abstractRequest(sendOptions, msg);
      }
    }

    class MyCustomChainRpc extends CosmosSdkRpc {
      constructor(rpc, constants) {
        super(rpc, constants);
        this.cosmosBuilder = new MyCustomChainBuilder();
      }

      async executeCustomRequest(txOptions, customAddress, customAmount) {
        const options = await this.prepareOptions(txOptions, {
          // for using inside myCustomRequest
          customAddress,
          customAmount,
          // you can also redefine fee for example
          fee: {
            denom: 'uatom',
            amount: '500',
          }
        });

        // calling previously defined myCustomRequest
        const txRequest = this.cosmosBuilder.myCustomRequest(options);

        // sending to server
        return this.handleResponse(axios.post(`${this.rpc}/txs`, {
          tx: JSON.parse(txRequest.json),
          mode: 'sync',
        }));
      }
    }
    
    const config = new NetConfig('customprefix', 'custompubprefix');

    config.setDerivation('119');

    const myCustomChainRpc = new MyCustomChainRpc('http://rpc.server', config);

    const keyPair = myCustomChainRpc.getKeyPairByPrivateKey('a5b1305ebf29997a8a180b8bf322bc27b226e8cd00e243887e2129839c36bb2d');

    assert.equal(keyPair.address.indexOf('customprefix'), 0);

    //TODO: emulate rpc server and test requests sending
  });
});
