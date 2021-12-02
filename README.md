# gratzio
The gratz.io testbed

The project's goal is to establish a Distributed Autonomous Organization (DAO), whose participants exchange favors between each other. The DAO is Stellar-based. To join it, one clones and installs the amissine/gratzio-join public repository. This results in a request for the project's maintaner to:
- create a Stellar account for the new participant;
- create a trustline from this account to the project's asset issuer;
- fund the account with the initial amount of the project's asset GRAT.

When the account is funded, its holder can do favors to other participants for more GRAT, and/or send GRAT to other accounts in exchange of favors from their holders.

## Test case 1 - initial distribution

Add certain **amount** of a new **asset**. Add asset's **recipient**s (Stellar accounts). Distribute the amount between the recipients and check the distribution.

## Test case 2 - exchange of favors
