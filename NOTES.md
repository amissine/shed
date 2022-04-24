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
     | offer.make -> pay 100 DOGs |                                    | 
     |--------------------------->|                                    |
     |                            | notify -> offer                    |
     |                            |----------------------------------->|
     |                                          offer.ask -> Create CB |
     |<----------------------------------------------------------------|
     |                                                                 |  
     | ask.fulfill -> Claim CB                                         |
     |---------------------------------------------------------------->|
```
Here, user Gratzio is the offer maker, and user Did Alik is the offer taker. Making an offer costs 100 Drops Of Gratitude (DOGs), payable to the Agent. 1 HEXA is 10000000 DOGs.

When the Agent gets paid, all users are being notified of the newly made offer. Some of them may be willing to have the offer maker fulfill their ask. To indicate that, an asker creates a Claimable Balance with two claimants - herself and the offer maker. The CB amount reflects how much HEXA the asker is willing to send to the maker if the maker fulfills her ask. The asker can reclaim this amount back at any time.

The offer maker claims one or more CBs, thus letting their respective askers know their asks have been fulfilled. The offer maker MUST deliver on her offer to all of them.

When an asker has already reclaimed her ask, the offer maker will not be able to claim it successfully. It is OK.

## Request/Bid Protocol Sample Sequence Diagram

```
+----------+                   +-------+                    +------+
|   User   |                   | Agent |                    | User |
| Did Alik |                   +-------+                    | Ken  |
+----------+                       |                        +------+
    |                              |                            |
    | request.make -> pay 100 DOGs |                            |
    |----------------------------->|                            |
    |                              | notify -> request          |
    |                              |--------------------------->|
    |                                  request.bid -> Create CB |
    |<----------------------------------------------------------|
    |                                                           |
    | bid.accept -> Claim CB, send payment + claimed            |
    |---------------------------------------------------------->|
```
Here, user Did Alik is the request maker, and user Ken is the request taker. Making a request costs 100 DOGs, payable to the Agent.

When the Agent gets paid, all users are being notified of the newly made request. Some of them may be willing to have the request maker accept their bid. To indicate that, a bidder creates a Claimable Balance with two claimants - herself and the request maker. The CB amount can be any positive amount of DOGs. The bidder can reclaim this amount back at any time.

The requst maker claims one or more CBs, thus letting their respective bidders know their bids have been accepted. The bidder MUST deliver on her bid to the request maker.

When a bidder has already reclaimed her bid, the request maker will not be able to claim it successfully. It is OK.

