## Install
```
npm install git://github.com/cybercongress/cosmos-js.git#cosmos-builder --save
```

# RPC server calling

## Usage example for Cosmos-sdk RPC
```
import CosmosSdkRpc from 'cosmos-js/build/rpc/cosmosSdkRpc';
const constants = require('cosmos-js/build/constants/cosmos');

const cosmosRpc = new CosmosSdkRpc('https://lcd-do-not-abuse.cosmostation.io', constants);

const fromAddress = 'cosmos1adfp4t779mz5mqkp774l4d0umm2x9v4s42prxw';
const fromPrivateKey = 'a5b1305ebf29997a8a180b8bf322bc27b226e8cd00e243887e2129839c36bb2d';

const toAddress = 'cosmos14mgwf74me9jneaj7pxna873ufrqdwzes2vt4kl';
const amount = 1;

cosmosRpc
  .transfer(
    {
      address: fromAddress,
      privateKey: fromPrivateKey,
    },
    toAddress,
    amount
  )

  .then(res => {
    console.log('res', res);
  })

```

## Usage example for CyberD RPC

```

import CyberDRpc from 'cosmos-js/build/rpc/cyberdRpc';

const constants = require('cosmos-js/build/constants/cyberd');

const cyberdRpc = new CyberDRpc('http://93.125.26.210:34657', constants);

const fromAddress = 'cyber1adfp4t779mz5mqkp774l4d0umm2x9v4sjpxt05';
const fromPrivateKey = 'a5b1305ebf29997a8a180b8bf322bc27b226e8cd00e243887e2129839c36bb2d';

const toAddress = 'cyber14mgwf74me9jneaj7pxna873ufrqdwzesd8val9';
const amount = 1;

cyberdRpc
  .transfer(
    {
      address: fromAddress,
      privateKey: fromPrivateKey,
    },
    toAddress,
    amount
  )

  .then(res => {
    console.log('res', res);
  });
```

# Custom builder definition

You might need use cosmos-sdk builder but with some custom RPC methods or with changes 
in transaction structure.

In this case - better to define your own builder that extends some exist builder 
like CosmosSdkBuilder.

For creating custom request - need to define js-amino type first of your custom message:

```
const { TypeFactory, Types } = require('js-amino');

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
```

Then - you can use this CustomMessage for build custom request.

```
import CosmosSdkBuilder from 'cosmos-js/build/builders/cosmosSdkBuilder';
import CosmosCodec from 'cosmos-js/build/codec';

export default class MyCustomChainBuilder extends CosmosSdkBuilder {
  constructor() {
    super();
    // redefine codec for set new types if you want
    this.codec = new CosmosCodec();
    this.codec.registerConcrete(new CustomMessage(), 'my-custom-chain/custom-message', {});
  }
  
  myCustomRequest(sendOptions) {
    const msg = new CustomMessage(sendOptions.customAddress, sendOptions.customAmount);
    return this.abstractRequest(sendOptions, msg);
  }
}
```

Then - you can build your request:
```
const requestData = {
  account: {
    address: keyPair.address,
    publicKey: keyPair.publicKey,
    privateKey: keyPair.privateKey,
    accountNumber: 0,
    sequence: 0,
  },
  chainId: 'euler-4',
  customAddress: 'my-custom-address,
  customAmount: '999,
  fee: {
    denom: '',
    amount: '0',
  },
  memo: ''
};

const customChainBuilder = new MyCustomChainBuilder();

const txRequest = customChainBuilder.myCustomRequest(requestData);

console.log('you can send result json to server:', txRequest.json);
console.log('or you can send result hex to server:', txRequest.hex);
```

Its already signed tx and converted to suitable for RPC server format.

If your RPC server takes non-standart data structures in Fee or Signature - you can
redefine `sendRequest`, `getResultTx`, `getFee`, `getSignature`, `getSignature`, 
`signMessageJson` methods for write specific logic or data structure.

By this way - all your custom transactions will follow the same specific rules that 
defined in these methods.

You can see the example in [cyberDBuilder.js](./src/builders/cyberDBuilder.js).

