import test from 'ava' // {{{1
import { Poke, Txdr, encrypt, decrypt } from '../v2/lib/account.mjs'
import { Favor, FavorRequest, FavorRequestor } from '../v2/lib/favor.mjs'
import { delay } from '../v2/lib/utils.mjs'
import { Keypair } from 'stellar-sdk'

test('IT1 Favor Producer 1', async t => { // {{{1
  let effects = await Poke.effects()
  let records = effects._embedded.records, request
  let self = new URL(effects._links.self.href).searchParams.get('cursor').toString()

  // See if a test request already exists
  if (records[0].type == 'claimable_balance_claimant_created' &&
    Date.now() - new Date(records[0].created_at).getTime() < 10000
  ) {
    console.log('TODO test request already exists')
  } else { // wait for test request
    request = await Favor.waitFor(new FavorRequest(), self)
    console.log(request)
  }

  //console.log(await Favor.description(records[0].balance_id))

  /*console.log(prev)
  while (records[9].type == 'claimable_balance_claimant_created') {
    console.log(records)
    await delay(1500) // the rate limit is 1000 ms
    effects = await Poke.effects(prev)
    records = effects._embedded.records
    prev = new URL(effects._links.prev.href).searchParams.
      get('cursor').toString()
    console.log(prev)
  }
  console.log(records)
  */

  t.assert(!!effects, `- UNEXPECTED: effects ${effects}`)
})
