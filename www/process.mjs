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
      AGENT: 'GBLF77YELSQU672HS3PSGNDAH45JHUBRFPHTCVOKH2KZRPSWZWERG7MX',
      HEXA_ISSUER: 'GBL4R4CV66IKQ7SVF744RAMTCQAEWFEHWTO4B4SAYSHXBLNGWC2663KZ',
      HORIZON_URL: 'https://horizon-testnet.stellar.org',
      STELLAR_NETWORK: 'TESTNET',
    },
    session: {},
    view: {
      init,
    },
  }
}
// }}}1
export { setenv }
