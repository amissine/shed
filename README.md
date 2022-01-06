# 👷 gratzio
The gratz.io testbed. QA: [https://gratzio.w3spaces.com](https://gratzio.w3spaces.com)

The project's goal is to establish a Distributed Autonomous Organization (DAO), whose members (users) exchange favors with each other. The DAO is [Stellar](https://stellar.org/)-based. To join it, the **user** either uses the (QA) website, or clones and installs the [amissine/gratzio-join](https://github.com/amissine/gratzio-join) public repository. This results in a request for the **agent** to:

- create a Stellar account for the user;
- create a trustline from this account to the project's **GRAT issuer**;
- fund the account with the initial amount of the project's asset **GRAT**.

When the account is funded, its holder can do favors to other users for more GRAT, and/or send GRAT to other accounts in exchange of favors from their holders.

## Setup

Run

```bash
npm i && npm run init [ --run=<stellar_network> ]
```

and add public and secret keys for GRAT issuer and agent when prompted. 

The default value for *\<stellar_network\>* above is *testnet*. Alternatively, use *public*. Here's more on merging (TODO elaborate):

![On merging with git](./gitmerge.png "From old files")

## Test case 0 - get agent account by public/secret key

![Test case 0 results](./account.test.png "Shoot 3")

## Test case 1 - fund agent

Fund agent with 1 billion GRAT. To do so, run

```bash
npm test --run=test/fund-agent.mjs
```

To locate and fix bugs, run

```bash
npx esbuild --outfile=dist/index.mjs --format=esm test/fund-agent.mjs
```

![Test case 1 results](./fund-agent-1.test.png "Shoot 1")
![Test case 1 results](./fund-agent-2.test.png "Shoot 1")

## Test case 2 - add user

Have agent:

- create an account for the user PK;
- fund user with 0 XLM;
- setup and authorize the trustline with GRAT issuer;
- fund user with 1000 GRAT.

To do so, run

```bash
npm test --run=test/add-user.mjs
```

![Test case 2 results](./add-user.test.png "Shoot 1")

## Test case 3 - exchange favors

Exchange favors between the users.

```bash
npm run dev 
```

![Test case 3 results](./exchange-favors.test.png "Shoot 1")

### Test case 3.1 - set locations

For all users, set their locations. To do so, run

```bash
npm test --run=test/set-locations.mjs
```

![Test case 3.1 results](./set-9-locations.test.png "Shoot 1")

Then map users:

![Test case 3.1 results](./get-9-locations-1.test.png "Shoot 1")
![Test case 3.1 results](./get-9-locations-2.test.png "Shoot 1")
![Test case 3.1 results](./map-9-locations.test.png "Shoot 1")

And Happy coming New 2022!

![Test case 3.1 results](./add-saskatoon.test.png "Shoot 1")

### Test case 3.2 - request favor

Select a user. Have the user request favor, wait 15 seconds, then reclaim the claimable balance.

```bash
npm test --run=test/request-favor.mjs
```

Test results:

```bash
> export $(cat .env|tr -d [:blank:]|xargs) && ava -v -w --timeout=2m "test/request-favor.mjs"


SD4DTYT4SB22YZUZIUVD4WR43YNWJQNSRK5X3MYOFUPITV3C6DH2ATA6
SBEJRMGJGWVME6UAXNHLSN3MXRV462JZY7UMXGHU3XCR2UP4POWZEDDS
SCTVVGWNZTELDZ6BITUCMKNJNLWKXY2QHX7Q4E3VA3NOCPLQBJU7IDMT
SD5PP5JP255R7EO567CAKWEWIEODO3UUF3ZCF6YIQ4BEOXSXCQUH4DKE
SAIFQIASW4FO5GB3A4ZX4HIDPJMU43K4YIUOIRVQ776DGEGODEUI2NFC
SDQ3UXFOZBWK3VQ7AOYN5DR3L4AUHZ4M72ZW4GBUH3KKIGMBKQUWQFCP
SAOLV6DATVACO7UZCJRVC6TLWV3TZZCH7QCKRQREYGC4P2LEFX6XTTVS
SC52B62CNWKYJ4OJKY7Y2QMMZ5UW3RM6TV7LV5JCRYYQXJZJY6OA2R6M
SAWOB63W5KY7SC5OEFNYS324F66I4T3FCFGNDBPD4RRAQPCLYMUERTKT
- add liquidity for user GA5RLKCWW7GQJYXLJLQGNGSSOTWWXIUUSG7XZNPPRN6GYOSSGF66MEKI signed by AGENT
d36035e334d58a30d22582a9f1b236e7999a0de0c4e12ce3ba3a0057b8d3ca4f
- tx signed and submitted by user
- clear liquidity data for user GA5RLKCWW7GQJYXLJLQGNGSSOTWWXIUUSG7XZNPPRN6GYOSSGF66MEKI signed by AGENT
030e1fb2ed4f634901577b0b0d4f22d9abb5c3fa3f1cf6ec3205800d2aa2d5c7
- tx signed and submitted by user
- remove liquidity for user GA5RLKCWW7GQJYXLJLQGNGSSOTWWXIUUSG7XZNPPRN6GYOSSGF66MEKI signed by AGENT
0bfbf4bd140fd886aedfd2fc575ba4bb909a8d669109c7f290981d8929b9975d
- txId signed and submitted by user
  ✔ request-favor.mjs › request favor (32s)
  ─

  1 test passed [16:01:56]
```
