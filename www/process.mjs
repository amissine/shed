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
      AGENT_test: 'GASOVOHQ4KA3GUSTOXCBVDNXFLOAMW7H6P2HCE4YVH2WFTVB7J5D3SNN',
      HEXA_ISSUER_custom: '',
      HEXA_ISSUER_public: 'GC7BFT2ZXIQAU2GAYNODPVJV4OBFECV5L3NKO4RV5SHXFUR24M3BZNPY',
      HEXA_ISSUER_test: 'GBNDCQH7IVVKFE2D6NSCQ7XHM427IMNIWRLQCD3HOBY2FNZXVPO3D35A',
      HORIZON_URL_custom: '',
      HORIZON_URL_public: 'https://horizon.stellar.org',
      HORIZON_URL_test: 'https://horizon-testnet.stellar.org',
      STELLAR_NETWORK_custom: '',
      STELLAR_NETWORK_public: 'PUBLIC',
      STELLAR_NETWORK_test: 'TESTNET',
      U0_custom_userPK: '',
      U0_public_userPK: '',
      U0_test_userPK: 'GBXIG5UMRE6P2DBBFUZ5LP7FXZLBGA5YJP5HMMODGR4GQZOWXKPTA22F',
      U1_custom_userPK: '',
      U1_public_userPK: '',
      U1_test_userPK: 'GBE7VL2Z4CHJF45H2IJUSIRUOFO6URDYH5M57BQW55742ROFK6O5XYCK',
    },
    session: {},
    view: {
      init,
    },
  }
}
// }}}1
export { setenv }
