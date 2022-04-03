import { init } from './view/onload.mjs'
import { Semaphore, } from './model/impl/utils.mjs'

function setenv () { // {{{1
  if (window.process) {
    return;
  }
  window.process = {
    env: {
      AGENT: 'GDUS3B7FBPFH6EEFW4PGS3WWDLCQRRYL6Y6YESKGZAINNBUCE74354L5',
      GRAT_ISSUER: 'GBAHB5X4R73XWKTUOZZRVCZF2X4EUOJ3UOFQFE6ECFZ34QG3QBKRROA3',
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
