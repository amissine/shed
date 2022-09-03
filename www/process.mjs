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
      AGENT_public: 'GCKD37IZDNMZN5ZAYDCJPSJNESQEE7UDPM6C4QU7LPIHFZVN4WPBO2EN',
      AGENT_test: 'GCSSQYIMJNVP2J77CMZ2QISEPKT3VXKF6KT4WVBYUCTKPDR5NKGWJQNC',
      HEXA_ISSUER_custom: '',
      HEXA_ISSUER_public: 'GC7BFT2ZXIQAU2GAYNODPVJV4OBFECV5L3NKO4RV5SHXFUR24M3BZNPY',
      HEXA_ISSUER_test: 'GAG5MCBSFOYCUQ4QKSEE5AMIHFR3WSZ2IPYYWUMS5H3PG5RY6ERBUBJP',
      HORIZON_URL_custom: '',
      HORIZON_URL_public: 'https://horizon.stellar.org',
      HORIZON_URL_test: 'https://horizon-testnet.stellar.org',
      STELLAR_NETWORK_custom: '',
      STELLAR_NETWORK_public: 'PUBLIC',
      STELLAR_NETWORK_test: 'TESTNET',
      U0_custom_userPK: '',
      U0_public_userPK: '',
      U0_test_userPK: 'GDCJG5DN7I7XPMDBPYOO4C54H5MK6P5KLBYQPTJ3BSWE6JGTT7V6YCXS',
      U1_custom_userPK: '',
      U1_public_userPK: '',
      U1_test_userPK: 'GDI6VXCWPTZRYUT6GKEPIU4WUFMUUHN6KMSS5KS4AAGJAHCQS63ZZURW',
    },
    session: {},
    view: {
      init,
    },
  }
}
// }}}1
export { setenv }
