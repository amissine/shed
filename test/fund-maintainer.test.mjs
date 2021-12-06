import test from 'ava' // {{{1
import { fundMaintainer } from '../v2/src/fund-maintainer.mjs'
/*
 * https://developers.stellar.org/docs/issuing-assets/
 */

test('fund maintainer', async t => { // {{{1
  const r = await fundMaintainer()

  t.assert(r == 'OK', `- UNEXPECTED: '${r}'`)
})
