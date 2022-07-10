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
      AGENT_test: 'GCESUDJQ3BJ47G7ZI2DNW24QEEUS4BJKCPJHPYSJNI7QJY2FZI2ZAMUP',
      HEXA_ISSUER_custom: '',
      HEXA_ISSUER_public: '',
      HEXA_ISSUER_test: 'GDRTTIV4FP6IXGOCCHD7QZT4SH62DF243HCWZH453TMGNY6HYZ3C3ZUT',
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
