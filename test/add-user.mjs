import test from 'ava' // {{{1
import { Poke, Txdr } from '../v2/lib/account.mjs'
import { Keypair } from 'stellar-sdk'

test('add user', async t => { // {{{1
  const userKeys = Keypair.random()
  const userPK = userKeys.publicKey()

  console.log(`- creating ${userPK}...`)
  let agent = await new Poke(process.env.MAINTAINER_SECRET)
  let xdr = await agent
  .begin(userPK)
  .createAccount(userPK, '0')
  .changeTrust(Poke.asset, '1000000', userPK)
  .end(userPK).toXDR()
  console.log('  - XDR signed by agent')

  let txId = await new Txdr(xdr).submit({ keys: [userKeys] })
  console.log('  - XDR signed and submitted by user')
  console.log(`- txId ${txId}`)

  console.log(`- funding ${userPK}...`)
  agent = await new Poke(process.env.MAINTAINER_SECRET)
  txId = await agent.payment(userPK, Poke.asset, '1000').submit()
  console.log(`- txId ${txId}`)

  t.assert(!!txId, `- UNEXPECTED: '${txId}'`)
})
