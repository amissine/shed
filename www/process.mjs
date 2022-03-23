import { init } from './view/onload.mjs'

function setenv () { // {{{1
  if (window.process) {
    return;
  }
  window.process = {
    demo: {
      bid: [
        ', bidding GRAT 101 on your request. Cheers, ',
        ', bidding GRAT 100 on your request. Cheers, ',
        ', bidding on your request. Cheers, ',
        ', bidding GRAT 99 on your request. Cheers, ',
      ],
      bidValidity : [120, 100, 80, 70], // seconds
    },
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
