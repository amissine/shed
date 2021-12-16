import test from 'ava' // {{{1
import { Poke, Txdr, encrypt, decrypt } from '../v2/lib/account.mjs'
import { Asset, Keypair, } from 'stellar-sdk'
/*import { promises } from 'fs'

async function append(data) { // {{{1
  await promises.appendFile('test/set-locations.log', 
    typeof data == 'string' ? data : JSON.stringify(data))
}
*/

const locations = [ // {{{1
  26,    -80.3,
  26,    -80.25,
  26,    -80.2,
  25.95, -80.3,
  25.95, -80.25,
  25.95, -80.2,
  25.9,  -80.3,
  25.9,  -80.25,
  25.9,  -80.2,
]

test('set locations', async t => { // {{{1
  let agent = await new Poke(process.env.AGENT)
  const users = agent.account.balances
    .filter(b => b.asset_code == 'RQST') // or 'OFFR'

  let i = 0
  for (let u of users) {
    let userPK = u.asset_issuer
    let user = await new Poke(userPK)
    const data = user.data()
    let decrypted = decrypt(data.td1 + data.td2)
    let userKeys = Keypair.fromSecret(decrypted)
    let lat = locations[i++], lng = locations[i++]
console.log(decrypted, lat, lng)

    let agent = await new Poke(process.env.AGENT_SECRET)
    let xdr = await agent
      .begin(userPK)
      .put('location', `${lat} ${lng}`, userPK)
      .end(userPK).toXDR()
console.log('  - XDR signed by agent')

    let txId = await new Txdr(xdr).submit({ keys: [userKeys] })
console.log(txId)
  }

  t.assert(users.length == 9, `- UNEXPECTED: users.length ${users.length}`)
})
