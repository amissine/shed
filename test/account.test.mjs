import test from 'ava' // {{{1
import { Account } from '../v2/lib/account.mjs'

test('get maintainer account by public/secret key', async t => { // {{{1
  const m2 = await new Account(process.env.MAINTAINER_SECRET)
  const xdr = m2.put('key1', 'value1').toXDR()
  console.log(xdr)
  let txId = await m2.submit(xdr)
  console.log(txId)
  txId = await m2.put('key2', 'value2').submit()
  console.log(txId)

  const m1 = await new Account(process.env.MAINTAINER)
  console.log(m1.data())

  t.assert(m1.account.id == process.env.MAINTAINER
    && m2.account.id == process.env.MAINTAINER, 
    `- UNEXPECTED: '${m1} ${m2}'`
  )
})
