import test from 'ava' // {{{1
import { Poke, Txdr, encrypt, decrypt } from '../v2/lib/account.mjs'
import { Favor, FavorRequest, FavorRequestor } from '../v2/lib/favor.mjs'
import { delay } from '../v2/lib/utils.mjs'
import { Keypair } from 'stellar-sdk'

test('IT1 Favor Requestor 1', async t => { // {{{1
  const users = await Poke.users() // {{{2

  let userKeys = [], rqst, bids = [] // {{{2
  for (let u of users) {
    const data = Poke.b2a(u.data)
    let decrypted = decrypt(data.td1 + data.td2)
    userKeys.push(Keypair.fromSecret(decrypted))
  }

  console.log(Date.now())
  await delay(3000) // {{{2
  await Favor.addRequest(rqst = new FavorRequest(new FavorRequestor(userKeys[0]),
    `Favor description goes here.
    Favor description consists of one or more lines of text.
    The total length of the text is limited to 2000 characters.`,
    29000 // 29s validity, defalt amount 1.1 GRAT
  ))
  console.log(Date.now())

  // Wait for 2 bids {{{2
  /*
  for await (let bid of rqst.bids(2)) {
    bids.push(bid)
    console.log(bid)
  }

  // Accept the bid from Favor Producer 2 {{{2
  await delay(1000)
  */

  // TODO make sure the request is removed {{{2
  await delay(35000)
  await Favor.removeRequest(rqst)
  // }}}2
  t.assert(users.length > 0, `- UNEXPECTED: users.length ${users.length}`)
})
