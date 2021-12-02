# gratzio
The gratz.io testbed

The project's goal is to establish a Distributed Autonomous Organization (DAO), whose members (users) exchange favors with each other. The DAO is [Stellar](https://stellar.org/)-based. To join it, the user clones and installs the [amissine/gratzio-join](https://github.com/amissine/gratzio-join) public repository. This results in a request for the maintaner to:

- create a Stellar account for the user;
- create a trustline from this account to the project's asset issuer;
- fund the account with the initial amount of the project's asset GRAT.

When the account is funded, its holder can do favors to other users for more GRAT, and/or send GRAT to other accounts in exchange of favors from their holders.

## Test case 1 - initial setup

Create account for the asset issuer (maintainer). Fund it with the initial amount of GRAT.

## Test case 2 - add user

Create account for the user. Setup the trustline with asset issuer. Fund user with GRAT.

## Test case 3 - exchange favors
