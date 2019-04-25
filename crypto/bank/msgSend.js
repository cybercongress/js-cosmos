let {
    Codec,
    TypeFactory,
    Types
} = require('js-amino');

let Bench32Prefix = require('../../Types/bench32Prefix');


let Utils = require("../../utils")

let Coin = require("../../Types/coin")


let MsgSend = TypeFactory.create('MsgSend', [
    {
        name: "to",
        type: Types.ByteSlice
    },
    {
        name: "amount",
        type: Types.Struct
    }
])


getSignBytes = msgSend => {
    let tmpObj = JSON.parse(JSON.stringify(msgSend.JsObject())) 
    tmpObj.to = Bench32Prefix.addressToBech32(Utils.bytesToHex(tmpObj.to)) 
    let bz = JSON.stringify(tmpObj)
   
    return bz;
}



registerConcrete = codec => {    
    codec.registerConcrete(new MsgSend(), "cosmos-sdk/MsgSend", {});
}

create = sendingObj => {
    let coin = Coin.create(sendingObj.amount)
    let msgSend = new MsgSend(        
        Utils.hexToBytes(Bench32Prefix.bech32ToAddress(sendingObj.to)),
        coin )
    
        return msgSend;   
}

module.exports = {
    create,
    registerConcrete,
    getSignBytes
}
