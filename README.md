POC for purestake to demonstrate subgraph issue


Event data is accurate but calls within the sRomeERC20.handleLogRebase return inaccurate data. The inaccurate fields are Rebase.stakedRomes and Rebase.romePrice. Both of these fields rely on contract calls as opposed to event data. Contract calls were bugged until the latest purestake RPC release.

You can use this query to see the results:
```graphql
{
  rebases(first: 10, orderBy:epoch) {
    id
    epoch
    stakedRomes
    romePrice
  }
}
```

## local testing
Make sure docker is running in the background and run:
```
./docker/start.sh
```

This starts a local graph node that reads from the Moonriver RPC.

Then in another terminal deploy the subgraph to your local graph node with:
```
yarn && yarn codegen
yarn create-local
yarn deploy-local
```
