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
      AGENT_test: 'GC56WPC7W6XNUXQDIQB4RED3UL56NJDNOQM6P4OYGTWWQ4KX4UZ5ONEE',
      HEXA_ISSUER_custom: '',
      HEXA_ISSUER_public: '',
      HEXA_ISSUER_test: 'GC7Y2CYGU642S5AZ3UGENGRKJ6CLIGQCCES35G2PPLSQTMUCVUYGFUCE',
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
