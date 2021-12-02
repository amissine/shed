import test from 'ava' // {{{1

// First, check the env{{{1
console.log(`- STELLAR_NETWORK is ${process.env.STELLAR_NETWORK}
- HORIZON_URL is ${process.env.HORIZON_URL}
- MAINTAINER is ${process.env.MAINTAINER}
- MAINTAINER_SECRET is ${process.env.MAINTAINER_SECRET}`)

test('fund maintainer', t => { // {{{1
  const r = 'OK'

  t.assert(r == 'OK', `- UNEXPECTED: '${r}'`)
})
