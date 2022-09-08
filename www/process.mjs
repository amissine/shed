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
      AGENT_test: 'GAUG3OZYX4EJLANRQSKRPE5U3Y6G6L4VNNYO2IUMIUB6LNUZP2EDJDOS',
      HEXA_ISSUER_custom: '',
      HEXA_ISSUER_public: 'GC7BFT2ZXIQAU2GAYNODPVJV4OBFECV5L3NKO4RV5SHXFUR24M3BZNPY',
      HEXA_ISSUER_test: 'GCVRP73KZTG5JC6A3FT4VPZF3AISKBZA5MOXP2KACDN5LX2KJKDSIDPA',
      HORIZON_URL_custom: '',
      HORIZON_URL_public: 'https://horizon.stellar.org',
      HORIZON_URL_test: 'https://horizon-testnet.stellar.org',
      STELLAR_NETWORK_custom: '',
      STELLAR_NETWORK_public: 'PUBLIC',
      STELLAR_NETWORK_test: 'TESTNET',
      U0_custom_userPK: '',
      U0_public_userPK: '',
      U0_test_userPK: 'GC453FG2JOPHMNUTYV3JTAZ5RKHO76FORM52OKFS2O3Z7PNWBRFOFOK2',
      U1_custom_userPK: '',
      U1_public_userPK: '',
      U1_test_userPK: 'GBQCFXWZCE5HP6WPHP4T5D6QGNMCGB56OXPHCF5UHBAAJI7GQIAG2ELG',
    },
    session: {},
    view: {
      init,
    },
  }
}
// }}}1
export { setenv }
