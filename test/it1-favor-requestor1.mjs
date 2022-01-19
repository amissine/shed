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
  await Favor.addRequest(rqst = new FavorRequest(new FavorRequestor(userKeys[3]),
    `Favor description goes here.
    Favor description consists of one or more lines of text.
    The total length of the text is limited to 2000 characters.`,
    34000 // 29s validity, defalt amount 1.1 GRAT
  ))
  console.log(Date.now())

  // Wait for 2 bids {{{2
  let rqstBids = rqst.bids(2)
  for await (let bid of rqstBids) {
    bid = JSON.parse(bid)
    bids.push(bid)
    console.log(bid)
  }

  // Accept the bid from Favor Producer 2 {{{2
  await delay(1000)
  let bidToAccept = bids[1], acceptedBidder
  await Favor.removeRequest(rqst)
  if (await rqst.accept(bidToAccept)) {
    // Consume the favor, send gratitude to the accepted bidder
    acceptedBidder = await Favor.creator(bidToAccept.balance_id)
    await Favor.gratitude(rqst.requestor, acceptedBidder, rqst.amount)
  } else {
    throw new Error('UNEXPECTED')
  }
  let consumer = await new Poke(rqst.requestor.keypair.publicKey())
  console.log(consumer.account.balances)
  let producer = await new Poke(acceptedBidder)
  console.log(producer.account.balances)
  console.log('=== THE END ===')
  // }}}2

  t.assert(users.length > 0, `- UNEXPECTED: users.length ${users.length}`)
})
