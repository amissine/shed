import test from 'ava' // {{{1
import { Poke, Txdr } from '../v2/lib/account.mjs'
import { Asset, Keypair, } from 'stellar-sdk'

test('add user', async t => { // {{{1
  const userKeys = Keypair.random()
  const userPK = userKeys.publicKey()

  console.log(`- creating ${userPK}...`)
  let agent = await new Poke(process.env.AGENT_SECRET)
  let xdr = await agent
  .begin(userPK)
  .createAccount(userPK, '0')
  .changeTrust(Poke.asset, '1000000', userPK)
  .end(userPK).toXDR()
  console.log('  - XDR signed by agent')

  let txId = await new Txdr(xdr).submit({ keys: [userKeys] })
  console.log('  - XDR signed and submitted by user')
  console.log(`- txId ${txId}`)

  console.log(`- funding and trusting ${userPK}...`)
  const offr = new Asset('OFFR', userPK)
  const rqst = new Asset('RQST', userPK)
  agent = await new Poke(process.env.AGENT_SECRET)
  txId = await agent
    .payment(userPK, Poke.asset, '1000')
    .changeTrust(offr, '1000')
    .changeTrust(rqst, '1000')
    .submit()
  console.log(`- txId ${txId}`)

  t.assert(!!txId, `- UNEXPECTED: '${txId}'`)
})
/*
 * GDEJMOKBI5PBL52DYCJBCZSHNSNHMMADZVYB6F4YKVNESJID7WWLZAMX
 * GCCWNYH3ZBWJGC3P343N74OOGCRMEQL5VNNUWHVAVGFJI2JDB6OW4UGG
 * GA42SYL5VKX64GVQLHHRYBUX7S5XG6LUM2JZ7XUOA2GLH2R7GKDBMSRQ
 */
