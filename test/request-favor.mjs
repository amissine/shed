import test from 'ava' // {{{1
import { Poke, Txdr, encrypt, decrypt } from '../v2/lib/account.mjs'
import { Favor, FavorRequest, FavorRequestor } from '../v2/lib/favor.mjs'
import { delay } from '../v2/lib/utils.mjs'
import { Keypair, } from 'stellar-sdk'

test('request favor', async t => { // {{{1
  const users = await Poke.users()

  let userKeys = [], rqst
  for (let u of users) {
    const data = Poke.b2a(u.data)
    let decrypted = decrypt(data.td1 + data.td2)
    userKeys.push(Keypair.fromSecret(decrypted))
  }
  await Favor.add(rqst = new FavorRequest(new FavorRequestor(userKeys[0])))
  await delay(10000)
  await Favor.remove(rqst)

  t.assert(users.length > 0, `- UNEXPECTED: users.length ${users.length}`)
})
