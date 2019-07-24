class NetConfig {
  static MAXGAS;

  static PREFIX_BECH32_ACCADDR;

  static PREFIX_BECH32_ACCPUB;

  static ENCODING_BECH32;

  static ENCODING_HEX;

  static DEFAULT_ENCODING;
}

NetConfig.MAXGAS = 200000;
NetConfig.PREFIX_BECH32_ACCADDR = 'cosmos';
NetConfig.PREFIX_BECH32_ACCPUB = 'cosmospub';
NetConfig.ENCODING_BECH32 = 'bech32';
NetConfig.ENCODING_HEX = 'hex';
NetConfig.DEFAULT_ENCODING = NetConfig.ENCODING_BECH32;

class AminoKey {
  static BIP44Prefix;

  static FullFundraiserPath;
}

AminoKey.BIP44Prefix = "44'/118'/";
AminoKey.FullFundraiserPath = `${AminoKey.BIP44Prefix}0'/0/0`;

module.exports = {
  NetConfig,
  AminoKey,
};
