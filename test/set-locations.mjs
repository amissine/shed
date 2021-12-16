import test from 'ava' // {{{1
import { Poke, Txdr, encrypt, decrypt } from '../v2/lib/account.mjs'
import { Asset, Keypair, } from 'stellar-sdk'
import { promises } from 'fs'

async function append(data) { // {{{1
  await promises.appendFile('test/set-locations.log', 
    typeof data == 'string' ? data : JSON.stringify(data))
}

test('set locations', async t => { // {{{1
  let txId = await Poke.clearAllUsers()
  if (txId) {
    console.log(`- txId ${txId}`)
  } else {
    //await append(agent.account.balances)
    console.log(process.env.AGENT_SECRET, process.env.AGENT_SECRET.length)
    const encrypted = encrypt(process.env.AGENT_SECRET)
    console.log(encrypted, encrypted.length)
    console.log(decrypt(encrypted))
  }

  t.assert(txId === null, `- UNEXPECTED: '${txId}'`)
})
