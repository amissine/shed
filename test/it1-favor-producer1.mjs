import test from 'ava' // {{{1
import { Poke, Txdr, encrypt, decrypt } from '../v2/lib/account.mjs'
import { acceptance, Favor, FavorRequest, FavorRequestor } from '../v2/lib/favor.mjs'
import { delay } from '../v2/lib/utils.mjs'
import { Keypair } from 'stellar-sdk'

test('IT1 Favor Producer 1', async t => { // {{{1
  const users = await Poke.users() // {{{2

  let userKeys = [] // {{{2
  for (let u of users) {
    const data = Poke.b2a(u.data)
    let decrypted = decrypt(data.td1 + data.td2)
    userKeys.push(Keypair.fromSecret(decrypted))
  }

  let effects = await Poke.effects() // {{{2
  let records = effects._embedded.records, request = records[0]
  let cursor = new URL(effects._links.self.href).searchParams.get('cursor').toString()

  // See if a test request already exists // {{{2
  if (request.type == 'claimable_balance_claimant_created' && // {{{3
    Date.now() - new Date(request.created_at).getTime() < 10000
  ) { // Favor Producer 2
    request.requestor = await Favor.requestor(request.balance_id)
    console.log(request.requestor)

    // Bid on the request
    let bid = {}, validity = 10000 //ms
    await delay(1000)
    Favor.bidOn.call(bid, request, userKeys[2], validity) // defalt amount 0.1 GRAT

    // Wait for Favor Requestor to accept the bid
    let timeout = validity * 1.5
    await acceptance.call(bid, request.requestor, request.balanceId, timeout)
    if (!!bid.json) {
      console.log(JSON.parse(bid.json))
    } else {
      await Favor.removeBid(bid)
    }
  } else { // Favor Producer 1 {{{3
    // Wait for test request
    request = await Favor.tail(new FavorRequest(), cursor)
    request.balanceId = JSON.parse(request.json).balance_id
    request.requestor = await Favor.creator(request.balanceId)
    console.log(request.requestor)

    // Bid on the request TODO lock AGENT
    let bid = { userKeys: userKeys[4] }, validity = 26000 //ms
    await delay(6000)
    await Favor.bidOn.call(bid, request, validity) // defalt amount 0.1 GRAT

    // Wait for Favor Requestor to accept the bid
    let timeout = validity * 1.5
    await acceptance.call(bid, request.requestor, bid.balanceId, timeout)
    if (!!bid.json) {
      console.log(JSON.parse(bid.json))
    } else {
      await Favor.removeBid(bid)
    }
  } // }}}3
  // }}}2
  t.assert(!!effects, `- UNEXPECTED: effects ${effects}`)
})
