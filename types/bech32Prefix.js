const Bech32 = require('bech32')

const Bech32PrefixAccAddr = "cosmos"
// Bech32PrefixAccPub defines the Bech32 prefix of an account's public key
const Bech32PrefixAccPub = "cosmospub"
// Bech32PrefixValAddr defines the Bech32 prefix of a validator's operator address
const Bech32PrefixValAddr = "cosmosvaloper"
// Bech32PrefixValPub defines the Bech32 prefix of a validator's operator public key
const Bech32PrefixValPub = "cosmosrvaloperpub"
// Bech32PrefixConsAddr defines the Bech32 prefix of a consensus node address
const Bech32PrefixConsAddr = "cosmosrvalcons"
// Bech32PrefixConsPub defines the Bech32 prefix of a consensus node public key
const Bech32PrefixConsPub = "cosmosrvalconspub"

const addressToBech32 = address => {
    let words = Bech32.toWords(utils.hexToBytes(address))
    let bech32Address = Bech32.encode(Bech32Prefix.Bech32PrefixAccAddr, words)
    return bech32Address
  }
  
  const bech32ToAddress = bech32Address => {
    let words = Bech32.decode(bech32Address).words
    return utils.bytesToHex(Bech32.fromWords(words)).toUpperCase()
  }

module.exports = {
    addressToBech32,
    bech32ToAddress,
    Bech32PrefixAccAddr,
    Bech32PrefixAccPub,
    Bech32PrefixValAddr,
    Bech32PrefixValPub,
    Bech32PrefixConsAddr,
    Bech32PrefixConsPub
}