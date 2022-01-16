import test from 'ava' // {{{1
import { Poke, Txdr, encrypt, decrypt } from '../v2/lib/account.mjs'
import { Asset, Keypair, } from 'stellar-sdk'

test('add user', async t => { // {{{1
  const userKeys = Keypair.random() // {{{2
  const userPK = userKeys.publicKey()
  const userSECRET = userKeys.secret()
  const encrypted = encrypt(userSECRET)
  const td1 = encrypted.slice(0, 64), td2 = encrypted.slice(64)
console.log(userSECRET)

  console.log(`- creating ${userPK}...`) // {{{2
  let agent = await new Poke(process.env.AGENT_SECRET)
  let xdr = await agent
  .begin(userPK)
  .createAccount(userPK, '0.0002') // 0.0002 XLM to fund merging in the end
  .changeTrust(Poke.asset, '1000000', userPK)
  .put('td1', td1, userPK).put('td2', td2, userPK)
  .end(userPK).toXDR()
  console.log('  - XDR signed by agent')

  let txBody = await new Txdr(xdr).submit({ keys: [userKeys] }) // {{{2
  console.log('  - XDR signed and submitted by user')
  console.log(`- txId ${txBody.id}`)

  console.log(`- funding ${userPK}...`) // {{{2
  agent = await new Poke(process.env.AGENT_SECRET)
  let txId = await agent
    .payment(userPK, Poke.asset, '1000')
    .submit()
  console.log(`- txId ${txId}`)
// }}}2
  t.assert(!!txId, `- UNEXPECTED: '${txId}'`)
})
/* FIXME
test('remove user', async t => { // FIXME {{{1
  let agent, xdr, txId, user
  const userPK = '' // TODO add userPK to remove {{{2
  user = await new Poke(userPK)
  const data = user.data()
  const userSECRET = decrypt(data.td1 + data.td2)
  const userKeys = Keypair.fromSecret(userSECRET)

  console.log(`- delete trustlines for OFFR, RQST assets from AGENT...`) // {{{2
  agent = await new Poke(process.env.AGENT_SECRET)
  txId = await agent
    .changeTrust(new Asset('OFFR', userPK), '0')
    .changeTrust(new Asset('RQST', userPK), '0')
    .submit()
  console.log(`- txId ${txId}`)

  console.log(`- pay GRAT back from user to AGENT, delete trustline for GRAT from user...`) // {{{2
  agent = await new Poke(process.env.AGENT_SECRET)
  xdr = await agent
  .begin(userPK)
  .payment(process.env.AGENT, Poke.asset, '1000', userPK) // TODO make sure 1000 is enough
  .changeTrust(Poke.asset, '0', userPK)
  .end(userPK).toXDR()
  console.log('  - payback XDR signed by agent')

  txId = await new Txdr(xdr).submit({ keys: [userKeys] }) // {{{2
  console.log('  - XDR signed and submitted by user')
  console.log(`- txId ${txId}`)

  console.log(`- delete signers and data entries from user...`) // TODO combine with the previous transaction {{{2
  agent = await new Poke(process.env.AGENT_SECRET)
  xdr = await agent
  .begin(userPK)
  //.setOpts({ masterWeight: 1, source: userPK })
  .put('td1', null, userPK).put('td2', null, userPK)
  .end(userPK).toXDR()
  console.log('  - delete signers and data entries XDR signed by agent')

  txId = await new Txdr(xdr).submit({ keys: [userKeys] }) // {{{2
  console.log('  - XDR signed and submitted by user')
  console.log(`- txId ${txId}`)

  console.log(`- merge ${userPK} to AGENT...`) // {{{2
  user = await new Poke(userSECRET)
  txId = await user
  .merge(userPK, process.env.AGENT)
  .submit()
  console.log(`- txId ${txId}`)
// }}}2
  t.assert(!!txId, `- UNEXPECTED: '${txId}'`)
})
*/
