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
      AGENT_test: 'GBXIYQQ3YIJX5WND5QCNXWSOAAHSBD4C2JKQXTUYZS7FW4OYFA6TPCJD',
      HEXA_ISSUER_custom: '',
      HEXA_ISSUER_public: '',
      HEXA_ISSUER_test: 'GDEX2S4S6U2OAEAANCXNLDRDU4WRTQ35NZXCEAB2HQWJ4NVGRD3L2PQT',
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
