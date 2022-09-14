/*
  NEVER edit process.mjs - ALWAYS edit process.mjs.dist
*/
import { init } from './view/onload.mjs'

function setenv () { // {{{1
  if (window.process) {
    return;
  }
  window.process = {
    env: {
      AGENT_custom: '',
      AGENT_public: 'GCKD37IZDNMZN5ZAYDCJPSJNESQEE7UDPM6C4QU7LPIHFZVN4WPBO2EN',
      AGENT_test: 'GB4Q6UNLMNGQCHC3NKU2OZJBUP7KMELMUDKWNQRG2RA72GSPPBL7USVU',
      HEXA_ISSUER_custom: '',
      HEXA_ISSUER_public: 'GC7BFT2ZXIQAU2GAYNODPVJV4OBFECV5L3NKO4RV5SHXFUR24M3BZNPY',
      HEXA_ISSUER_test: 'GBVH4OS7KLLY5KTHSO35NB2OUX56Y5QJUSB3BLC47Z6DNLZ4WFOEQA2R',
      HORIZON_URL_custom: '',
      HORIZON_URL_public: 'https://horizon.stellar.org',
      HORIZON_URL_test: 'https://horizon-testnet.stellar.org',
      STELLAR_NETWORK_custom: '',
      STELLAR_NETWORK_public: 'PUBLIC',
      STELLAR_NETWORK_test: 'TESTNET',
      U0_custom_userPK: '',
      U0_public_userPK: '',
      U0_test_userPK: 'GCQ55YMXGIW5J3RKJ5WER4VNFTBTHTPP2UKJ35ZEM6SYF2J42ORHGB23',
      U1_custom_userPK: '',
      U1_public_userPK: '',
      U1_test_userPK: 'GD7EULDD2NMGZEXQJCL7D4LY57EJNBAAD24KEHY5FDSFTTROGVCWZYO7',
    },
    session: {},
    view: {
      init,
    },
  }
}
// }}}1
export { setenv }
