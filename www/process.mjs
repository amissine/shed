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
      AGENT_test: 'GDWLL73NSHBWIBZA7ZWIDET6PV2K5DPRO3AGVH7Q5MNS6KP52ADKZMME',
      HEXA_ISSUER_custom: '',
      HEXA_ISSUER_public: '',
      HEXA_ISSUER_test: 'GAFMN5ODSBORRFPLH6KQKZ2LPQBAWCEMSZ6HA5KCQXJBQZY5H7ZS65XB',
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
