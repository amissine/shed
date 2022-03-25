import { init } from './view/onload.mjs'

function setenv () { // {{{1
  if (window.process) {
    return;
  }
  window.process = {
    env: {
      AGENT: 'GBZ6C2UIJO5LEHNW3KNX4FEWUEYAUDKIWDZKNWQGPM2ROWRB55SZB6QN',
      GRAT_ISSUER: 'GDRGWQSQJAACQTV4ITIG23PP2MHKOV4S2HNOHU3DDS5KD3JVXRFBMYEH',
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
