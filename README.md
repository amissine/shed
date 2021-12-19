# 👷 gratzio
The gratz.io testbed

The project's goal is to establish a Distributed Autonomous Organization (DAO), whose members (users) exchange favors with each other. The DAO is [Stellar](https://stellar.org/)-based. To join it, the **user** clones and installs the [amissine/gratzio-join](https://github.com/amissine/gratzio-join) public repository. This results in a request for the **agent** to:

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
