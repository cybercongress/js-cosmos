const PublicKey = require("./publicKey")
//const Signature = require("./signature")



registerConcrete = cdc => {
    PublicKey.registerConcrete(cdc)
    //Signature.registerConcrete(cdc)
    
}

module.exports = {   
    registerConcrete    
}