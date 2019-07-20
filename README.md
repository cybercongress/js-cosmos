## Install
```
npm install git://github.com/cybercongress/cosmos-js.git#cosmos-builder --save
```
## Usage example for Cosmos-sdk
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

## Usage example for CyberD

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
