/*
  NEVER edit process.mjs - ALWAYS edit process.mjs.dist
*/
import { init } from './view/onload.mjs'
import { Semaphore, } from './model/impl/utils.mjs'

function setenv () { // {{{1
  if (window.process) {
    return;
  }
  window.process = {
    env: {
      AGENT: 'GD5AVGHIT6QD42MC7EK74LKYS5OQNU6Y5OQVIWLTJ3PS2JKUJRIE5KNB',
      HEXA_ISSUER: 'GCZMMTALRGKD7VC4RY6JLCTOG6ZZABUMY7T5BE7CKFXHXOQIIU46DRYW',
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
