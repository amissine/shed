# 👷 Notes

The purpose of cloning `shed` from `gratzio` is to have a safe place for experimenting with Stellar, Cloudflare, and other technologies used by the project. It is also more open-source than its source `gratzio`, as the content of its `www/view` dir has been made public.

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

Run `cli/genesis.sh`. add the output to `cli/genesis.log`.

If present, remove file `.env`. Run

```bash
npm i && npm run init [ --run=<stellar_network> ]
```

and add public and secret keys for HEXA issuer and agent when prompted. 

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
