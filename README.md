POC for purestake to demonstrate subgraph issue

Running this subgraph locally against https://rpc.api.moonriver.moonbeam.network will return accurate data

Running this subgraph using thegraphs hosted service will return inaccurate data.







More details:
<b/>
Event data is accurate but contract calls within the sRomeERC20.handleLogRebase event handler will return inaccurate data. The inaccurate fields are Rebase.stakedRomes and Rebase.romePrice. Both of these fields rely on contract calls as opposed to event data. Contract calls were bugged until the latest purestake RPC release.

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

This subgraph is currently deployed in the graph hosted service for testing. It is currently returning inaccurate data for stakedRomes and romePrices.
https://thegraph.com/hosted-service/subgraph/zaqk/rome-subgraph-simple-poc?query=Example%20query

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
