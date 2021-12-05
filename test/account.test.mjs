import test from 'ava' // {{{1
import { Account } from '../v2/lib/account.mjs'

test('MAINTAINER', async t => { // {{{1
  const r = 'OK'
  const m = await new Account(process.env.MAINTAINER)

  console.log(m)

  t.assert(m.account.id == process.env.MAINTAINER, `- UNEXPECTED: '${m}'`)
})
