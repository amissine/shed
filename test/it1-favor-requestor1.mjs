import test from 'ava' // {{{1
import { Poke, Txdr, encrypt, decrypt } from '../v2/lib/account.mjs'
import { Favor, FavorRequest, FavorRequestor } from '../v2/lib/favor.mjs'
import { delay } from '../v2/lib/utils.mjs'
import { Keypair } from 'stellar-sdk'

test('IT1 Favor Requestor 1', async t => { // {{{1
  const users = await Poke.users()

  let userKeys = [], rqst
  for (let u of users) {
    const data = Poke.b2a(u.data)
    let decrypted = decrypt(data.td1 + data.td2)
    console.log(decrypted)
    userKeys.push(Keypair.fromSecret(decrypted))
  }

  await delay(3000)
  await Favor.add(rqst = new FavorRequest(
    new FavorRequestor(userKeys[0]),
    `Favor description goes here.
    Favor description consists of one or more lines of text.
    The total length of the text is limited to 2000 characters.`,
    9000 // 9s validity, defalt amount 1.1 GRAT
  ))

  // Start waiting for bids

  // TODO make sure the request is removed
  await delay(15000)
  await Favor.remove(rqst)

  t.assert(users.length > 0, `- UNEXPECTED: users.length ${users.length}`)
})
