let { TypeFactory, Types } = require('js-amino');

let PubKeySecp256k1 = TypeFactory.create('PubKeySecp256k1', [{
        name: "bytes",
        type: Types.ByteSlice
    } 
], Types.ByteSlice)



createPubKeySecp256k1 = bz => {
    let pubKey = new PubKeySecp256k1(bz)    
    return pubKey; 
}

registerConcrete = codec => {
    codec.registerConcrete(new PubKeySecp256k1(), "tendermint/PubKeySecp256k1", {});  
}

module.exports = {
    createPubKeySecp256k1,
    registerConcrete
}