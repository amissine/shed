# 👷 gratzio
The gratz.io testbed. QA: [https://gratzio.w3spaces.com](https://gratzio.w3spaces.com)

The project's goal is to establish a Distributed Autonomous Organization (DAO), whose members (users) exchange favors with each other. The DAO is [Stellar](https://stellar.org/)-based. To join it, the **user** goes to the (QA) website [https://gratzio.w3spaces.com](https://gratzio.w3spaces.com). This results in a request for the **agent** to:

- create a Stellar account for the user;
- create a trustline from this account to the project's **GRAT issuer**;
- fund the account with the initial amount of the project's asset **GRAT**.

When the account is funded, its holder can do favors to other users for more GRAT, and/or send GRAT to other accounts in exchange of favors from their holders.

## Setup

If present, remove file `.env`. Run

```bash
npm i && npm run init [ --run=<stellar_network> ]
```

and add public and secret keys for GRAT issuer and agent when prompted. 

The default value for *\<stellar_network\>* above is *testnet*. Alternatively, use *public*.

If testing, run `./reset.sh`.

Here's more on merging (TODO elaborate):

![On merging with git](./gitmerge.png "From old files")

## Scripts in `package.json`

In addition to existing scripts, on March 22, 2022, a set of `p*` scripts is being introduced. The `p` letter stands for **p**roduct.

### `pa`

Starts 3 processes:

- build process, `pb` (with optional command line flag `--el`);

- CloudFlare `wrangler dev`, `cfw`;

- Firefox `http://localhost:8787`, `ff`.

### `pb`

Build process. Runs `pc` (providing for **c**ontinuous development and testing), starts an external listener (occasionally used by the product) when env var `npm_config_el` is set to `true`.

### `pc`

Continuous development and testing, pre-committal.

### `pd`

Publish the distribution.

### `pe`

Populate the environment, run node task.
