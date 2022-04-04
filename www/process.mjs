import { init } from './view/onload.mjs'
import { Semaphore, } from './model/impl/utils.mjs'

function setenv () { // {{{1
  if (window.process) {
    return;
  }
  window.process = {
    env: {
      AGENT: 'GCLFVC4CY2QFZBB65AJZNUH7J6R2B7YN6YZNUL7AW2W6ISCBZOLUUXK6',
      GRAT_ISSUER: 'GC3JRAXWON24GZ4XOEWTSK744ACCJUWGKUZTG7SKENO4GVCJRAPCJRFR',
      HORIZON_URL: 'https://horizon-testnet.stellar.org',
      STELLAR_NETWORK: 'TESTNET',
    },
    lock: new Semaphore(1),
    session: {},
    view: {
      init,
    },
  }
}
// }}}1
export { setenv }
