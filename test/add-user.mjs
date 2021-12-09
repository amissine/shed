import test from 'ava' // {{{1
import { Account } from '../v2/lib/account.mjs'
import { Keypair } from 'stellar-sdk'

test('add user', async t => { // {{{1
  const userKeys = Keypair.random()
  const userPK = userKeys.publicKey()
  const issuerPK = process.env.ASSET_ISSUER

  console.log(`- creating ${userPK}...`)
  let agent = await new Account(process.env.MAINTAINER_SECRET)
  let txId = await agent
  .begin(userPK)
  .createAccount(userPK, '0')
  .changeTrust(Account.asset, '1000000', userPK)
  .end(userPK)
  .submit({ keys: [agent.keys, userKeys] })
  console.log(`- txId ${txId}`)

  console.log(`- funding ${userPK}...`)
  agent = await new Account(process.env.MAINTAINER_SECRET)
  txId = await agent.payment(userPK, Account.asset, '1000').submit()
  console.log(`- txId ${txId}`)

  t.assert(!!txId, `- UNEXPECTED: '${txId}'`)
})
