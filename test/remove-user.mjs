import test from 'ava' // {{{1
import { Poke, Txdr, encrypt, decrypt } from '../v2/lib/account.mjs'
import { Asset, Keypair, } from 'stellar-sdk'

test('remove user', async t => { // FIXME {{{1
  let agent, xdr, txBody, user
  //const userPK = '' // TODO add TEST USER userPK to remove {{{2
  //user = await new Poke(userPK)
  //const data = user.data()
  //const userSECRET = decrypt(data.td1 + data.td2)
  const userSECRET = 'SCVODNUO4VQVAGD2N2QE7PD56FMTDR332BLCXIZJASP3P3B4RXA3P6AS' // TODO add DEMO USER userSECRET to remove
  const userKeys = Keypair.fromSecret(userSECRET)
  const userPK = userKeys.publicKey()

  console.log(`- pay GRAT back from user to AGENT, delete trustline for GRAT from user...`) // {{{2
  agent = await new Poke(process.env.AGENT_SECRET)
  xdr = await agent
  .begin(userPK)
  .payment(process.env.AGENT, Poke.asset, '1000', userPK) // TODO make sure 1000 is enough
  .changeTrust(Poke.asset, '0', userPK)
  .end(userPK).toXDR()
  console.log('  - payback XDR signed by agent')

  txBody = await new Txdr(xdr).submit({ keys: [userKeys] }) // {{{2
  console.log('  - XDR signed and submitted by user')
  console.log(`- txId ${txBody.id}`)

  console.log(`- delete signers and data entries from DEMO USER...`) // {{{2
  agent = await new Poke(process.env.AGENT_SECRET)
  xdr = await agent
  .begin(userPK)
  //.setOpts({ masterWeight: 1, source: userPK })
  .put('lat', null, userPK).put('lng', null, userPK)
  .end(userPK).toXDR()
  console.log('  - delete signers and data entries XDR signed by agent')

  txBody = await new Txdr(xdr).submit({ keys: [userKeys] }) // {{{2
  console.log('  - XDR signed and submitted by user')
  console.log(`- txId ${txBody.id}`)

  console.log(`- merge ${userPK} to AGENT...`) // {{{2
  user = await new Poke(userSECRET)
  let txId = await user
    .merge(userPK, process.env.AGENT)
    .submit()
  console.log(`- txId ${txId}`)
// }}}2
  t.assert(!!txId, `- UNEXPECTED: '${txId}'`)
})
