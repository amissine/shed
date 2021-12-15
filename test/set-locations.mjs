import test from 'ava' // {{{1
import { Poke, Txdr } from '../v2/lib/account.mjs'
import { Asset, Keypair, } from 'stellar-sdk'
import { promises } from 'fs'

async function append(data) { // {{{1
  await promises.appendFile('test/set-locations.log', 
    typeof data == 'string' ? data : JSON.stringify(data))
}

test('set locations', async t => { // {{{1
  let agent = await new Poke(process.env.AGENT)
  const users = agent.account.balances.filter(b => b.asset_code == 'RQST')
  agent = await new Poke(process.env.AGENT_SECRET)

  if (users.length > 0) {
  for (let u of users) {
    const offr = new Asset('OFFR', u.asset_issuer)
    const rqst = new Asset('RQST', u.asset_issuer)
    agent.changeTrust(offr, '0').changeTrust(rqst, '0')
  }
  let txId = await agent.submit()
  console.log(`- txId ${txId}`)
  } else {
    await append(agent.account.balances)
  }

  t.assert(!!agent, `- UNEXPECTED: '${agent}'`)
})
