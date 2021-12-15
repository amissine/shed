import test from 'ava' // {{{1
import { Poke } from '../v2/lib/account.mjs'

test('get agent account by public/secret key', async t => { // {{{1
  let m2 = await new Poke(process.env.AGENT_SECRET)
  const xdr = m2.put('key1', 'value1').toXDR(null)
  console.log(xdr)
  let txId = await m2.submit({ xdr: xdr })
  console.log(txId)
  txId = await m2.put('key2', 'value2').submit()
  console.log(txId)

  let m1 = await new Poke(process.env.AGENT)
  console.log(m1.data())

  m2 = await new Poke(process.env.AGENT_SECRET)
  await m2.put('key1', null).put('key2', null).submit()
  m1 = await new Poke(process.env.AGENT)
  console.log(m1.data())

  t.assert(m1.account.id == process.env.AGENT
    && m2.account.id == process.env.AGENT, 
    `- UNEXPECTED: '${m1} ${m2}'`
  )
})
