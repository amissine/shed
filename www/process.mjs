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
      AGENT_public: '',
      AGENT_test: '',
      HEXA_ISSUER_custom: '',
      HEXA_ISSUER_public: '',
      HEXA_ISSUER_test: 'GCCQIGLTFK3OHKG65S2PQ67WZWN2Y6DTEJCTLZRA5NDSHQSJNB3ADE3S',
      HORIZON_URL_custom: '',
      HORIZON_URL_public: '',
      HORIZON_URL_test: 'https://horizon-testnet.stellar.org',
      STELLAR_NETWORK_custom: '',
      STELLAR_NETWORK_public: '',
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
