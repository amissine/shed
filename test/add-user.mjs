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
