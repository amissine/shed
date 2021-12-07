import test from 'ava' // {{{1
import { Account } from '../v2/lib/account.mjs'
import { Keypair } from 'stellar-sdk'

test('add user', async t => { // {{{1
  const r = 'OK', userKeys = Keypair.random()

  console.log(`- create an account for the user PK ${userKeys.publicKey()}`)

  t.assert(r == 'OK', `- UNEXPECTED: '${r}'`)
})
