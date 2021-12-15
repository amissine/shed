import test from 'ava' // {{{1
import { fundAgent } from '../v2/src/fund-agent.mjs'
/*
 * https://developers.stellar.org/docs/issuing-assets/
 */

test('fund agent', async t => { // {{{1
  const r = await fundAgent()

  t.assert(r == 'OK', `- UNEXPECTED: '${r}'`)
})
