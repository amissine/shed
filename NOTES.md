# 👷 Notes

The purpose of cloning `shed` from `gratzio` is to have a safe place for experimenting with Stellar, Cloudflare, and other technologies used in the project. It is also more open-source than its source `gratzio`, as the content of its `www/view` dir is now public.

## Project structure

```
     .----------shed---------------.
    /              \                \
  cli-----.        www---.          v2
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
npm i && npm run i --sk=<CREATOR_SK> [ --run=<stellar_network> ] [ --with=extras ]
```

and add env values when prompted. Then take care of *wrangler secret* values.

The default value for *\<stellar_network\>* above is *test*. Alternatively, use *public* or *custom*.

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
|  Alice  |                   +-------+                          | Did Alik |
+---------+                       |                              +----------+
     |                            |                                    |
     | offer.make: pay 100 DOGs   |                                    | 
     |--------------------------->|                                    |
     |                            | notify: offer                      |
     |                            |----------------------------------->|
     |                            |           offer.ask: create CB for |
     |                            |               gratitude + 100 DOGs |
     |<----------------------------------------------------------------|
     |                            |                                    |  
     | ask.fulfill: claim CB      |                                    |
     | (gratitude + 100 DOGs),    |                                    |
     | pay 100 DOGs               |                                    |
     |--------------------------->|                                    |
     |                            | notify: ask claimed (fulfilled)    |
     |                            |----------------------------------->|
```
Here, user Alice is the offer maker, and user Did Alik is the offer taker. Making an offer costs 100 Drops Of Gratitude (DOGs), payable to SHEX agent (the maker's fee). 1 HEXA is 10000000 DOGs.

When the agent gets paid, all users are being notified of the newly made offer. Some of them may be willing to take it. To indicate that, a taker creates Claimable Balance with two claimants - herself and the offer maker. The CB amount reflects how much HEXA the taker is willing to pay to the maker if the maker fulfills her ask. Part of this amount (100 DOGs) is the taker's fee. Before the maker claims the amount, the taker can reclaim it back.

The maker claims one or more CBs. For each successfully claimed CB, the maker pays the taker's fee to the agent, thus letting the taker know her ask has been fulfilled.

When a taker has already reclaimed her ask, the maker will not be able to claim it successfully. It is OK, the transaction will not be committed.

## Request/Bid Protocol Sample Sequence Diagram

```
+----------+                   +-------+                               +------+
|   User   |                   | Agent |                               | User |
| Did Alik |                   +-------+                               | Alex |
+----------+                       |                                   +------+
    |                              |                                        |
    | request.make: pay 100 DOGs   |                                        |
    |----------------------------->|                                        |
    |                              | notify -> request                      |
    |                              |--------------------------------------->|
    |                              |    request.bid: create CB for 100 DOGs |
    |<----------------------------------------------------------------------|
    |                              |                                        |
    | bid.accept: claim CB,        |                                        |
    | pay gratitude,               |                                        |
    |---------------------------------------------------------------------->|
    | pay 100 DOGs                 |                                        |
    |----------------------------->|                                        |
    |                              | notify: bid claimed (accepted)         |
    |                              |--------------------------------------->|
```
Here, user Did Alik is the request maker, and user Alex is the request taker. Making a request costs 100 DOGs, payable to the agent (the maker's fee).

When the agent gets paid, all users are being notified of the newly made request. Some of them may be willing to take it. To indicate that, a taker creates a Claimable Balance with two claimants - herself and the request maker. The CB amount (100 DOGs) is the taker's fee. Before the maker claims this amount, the taker can reclaim it back.

The maker claims one or more CBs. For each successfully claimed CB, the maker pays the taker's fee to the agent, thus letting the taker know her bid has been accepted. In the same transaction, the maker pays gratitude to the taker.

When a taker has already reclaimed her bid, the maker will not be able to claim it successfully. It is OK, the transaction will not be committed.

## Proof Of Concept Demo

To show how these sequence diagrams work in real time, I recorded a quick [YouTube demo](https://youtu.be/BiZXWoC9Q74) for the use case with one maker and two takers. The maker broadcasts the make, and each taker wants to take it. The maker receives the takes and claims both of them. When a taker gets notified of this event, the taker clears the scheduled reclaim.

The log data (see the link below) has this use case, and another one. In the other use case, the maker claims only one take and another take gets reclaimed.

## See Also

- [The POC Demo log data](./test/logs/1maker2takers.log)

## Misc

http://maps.google.com/maps?q=loc:28.43242324,77.8977673

