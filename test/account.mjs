import test from 'ava' // {{{1
import { Poke, encrypt, decrypt } from '../v2/lib/account.mjs'

const encrypted = encrypt(process.env.AGENT_SECRET)
const td1 = encrypted.slice(0, 64), td2 = encrypted.slice(64)
console.log(td1, td1.length, td2, td2.length)

test('get agent account by public/secret key', async t => { // {{{1
  let m2 = await new Poke(process.env.AGENT_SECRET)
  const xdr = m2.put('td1', td1).toXDR(null)
  console.log(xdr)
  let txId = await m2.submit({ xdr: xdr })
  console.log(txId)
  txId = await m2.put('td2', td2).submit()
  console.log(txId)

  let m1 = await new Poke(process.env.AGENT)
  const data = m1.data()
  console.log(data)
  let decrypted = decrypt(data.td1 + data.td2)

  m2 = await new Poke(process.env.AGENT_SECRET)
  await m2.put('td1', null).put('td2', null).submit()
  m1 = await new Poke(process.env.AGENT)
  console.log(m1.data())

  t.assert(decrypted == process.env.AGENT_SECRET,
    `- UNEXPECTED: '${decrypted}'`
  )
})
