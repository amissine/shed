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
      AGENT_test: 'GDWLL73NSHBWIBZA7ZWIDET6PV2K5DPRO3AGVH7Q5MNS6KP52ADKZMME',
      HEXA_ISSUER_custom: '',
      HEXA_ISSUER_public: 'GC7BFT2ZXIQAU2GAYNODPVJV4OBFECV5L3NKO4RV5SHXFUR24M3BZNPY',
      HEXA_ISSUER_test: 'GAFMN5ODSBORRFPLH6KQKZ2LPQBAWCEMSZ6HA5KCQXJBQZY5H7ZS65XB',
      HORIZON_URL_custom: '',
      HORIZON_URL_public: 'https://horizon.stellar.org',
      HORIZON_URL_test: 'https://horizon-testnet.stellar.org',
      STELLAR_NETWORK_custom: '',
      STELLAR_NETWORK_public: 'PUBLIC',
      STELLAR_NETWORK_test: 'TESTNET',
    },
    session: {},
    view: {
      init,
    },
  }
}
// }}}1
export { setenv }
