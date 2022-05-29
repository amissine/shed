# 👷 Notes

The purpose of cloning `shed` from `gratzio` is to have a safe place for experimenting with Stellar, Cloudflare, and other technologies used by the project. It is also more open-source than its source `gratzio`, as the content of its `www/view` dir is now public.

## Project structure

```
     .----------shed---------------.
    /              \                \
  cli-----.         w----.           v2
 /   \     \       / \    \
model v     p   model v   presenter
     / \   / \       / \     / \
    a   i a   i     a   i   a impl
```
Here, words are parts of a path to a git submodule. Other dir names are represented by their first letters.

See also: 

- [Checking out the submodules](https://stackoverflow.com/questions/11893678/warning-remote-head-refers-to-nonexistent-ref-unable-to-checkout)
- [Renaming a word in multiple files](https://stackoverflow.com/questions/11392478/how-to-replace-a-string-in-multiple-files-in-linux-command-line)

## Setup

Run

```bash
npm i && npm run i --sk=<CREATOR_SK> [ --run=<stellar_network> ]
```

and add env values when prompted. 

The default value for *\<stellar_network\>* above is *testnet*. Alternatively, use *public*.

If on *testnet*, run `npm test`.

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

## Offer/Ask Protocol Sample Sequence Diagram

```
+---------+                   +-------+                          +----------+
|  User   |                   | Agent |                          |   User   |
| Gratzio |                   +-------+                          | Did Alik |
+---------+                       |                              +----------+
     |                            |                                    |
     | offer.make -> pay 200 DOGs |                                    | 
     |--------------------------->|                                    |
     |                            | notify -> offer                    |
     |                            |----------------------------------->|
     |             offer.take -> Create CB for offer.amount + 100 DOGs |
     |<----------------------------------------------------------------|
     |                                                                 |  
     | offer.ask.fulfill -> Claim CB: gratitude + 100 DOGs             |
     |---------------------------------------------------------------->|
```
Here, user Gratzio is the offer maker, and user Did Alik is the offer taker. Making an offer costs 100 Drops Of Gratitude (DOGs), payable to SHEX agent. 1 HEXA is 10000000 DOGs.

When the agent gets paid, all users are being notified of the newly made offer. Some of them may be willing to take it. To indicate that, a taker creates a Claimable Balance with two claimants - herself and the offer maker. The CB amount reflects how much HEXA the taker is willing to send to the maker if the maker fulfills her ask. Part of this amount (100 DOGs) is the taker's fee. The maker has already paid the taker's fee to the agent, so the taker is now reimbursing it. Before the maker claims this amount, the taker can reclaim it back.

The maker claims one or more CBs, thus letting their respective takers know their asks have been fulfilled. The maker MUST deliver on her offer to all of them. The maker also MUST pay to the agent all extra taker fees.

When a taker has already reclaimed her ask, the maker will not be able to claim it successfully. It is OK.

## Request/Bid Protocol Sample Sequence Diagram

```
+----------+                   +-------+                               +------+
|   User   |                   | Agent |                               | User |
| Did Alik |                   +-------+                               | Alex |
+----------+                       |                                   +------+
    |                              |                                        |
    | request.make -> pay 200 DOGs |                                        |
    |----------------------------->|                                        |
    |                              | notify -> request                      |
    |                              |--------------------------------------->|
    |               request.take -> Create CB for request.amount + 100 DOGs |
    |<----------------------------------------------------------------------|
    |                                                                       |
    | request.bid.accept -> Claim CB, send gratitude + claimed - 100 DOGs   |
    |---------------------------------------------------------------------->|
```
Here, user Did Alik is the request maker, and user Alex is the request taker. Making a request costs 100 DOGs, payable to the agent.

When the agent gets paid, all users are being notified of the newly made request. Some of them may be willing to take it. To indicate that, a taker creates a Claimable Balance with two claimants - herself and the request maker. The CB amount reflects how much HEXA the taker is willing to send to the maker if the maker accepts her bid. Part of this amount (100 DOGs) is the taker's fee. The maker has already paid the taker's fee to the agent, so the taker is now reimbursing it. Before the maker claims this amount, the taker can reclaim it back.

The maker claims one or more CBs, thus letting their respective takers know their bids have been accepted. A bidder MUST deliver on her bid to the request maker. The maker MUST pay to the agent all extra taker fees.

When a taker has already reclaimed her bid, the maker will not be able to claim it successfully. It is OK.

