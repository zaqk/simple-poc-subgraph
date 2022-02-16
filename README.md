<h1>POC for purestake to demonstrate subgraph issue</h1>

<h3>tldr</h3>
-Running this subgraph locally against https://rpc.api.moonriver.moonbeam.network will return accurate data


-Running this subgraph using thegraphs hosted service will return inaccurate data.







<h3>More details:</h3>
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

For the query above we should expect to see results like this in thegraph hosted service:
```json
      {
        "epoch": "1",
        "id": "0xfb7348358b3a06f24b7e9faa4925d2c2400f40b9f74a660aed20341bfb6d9f80",
        "romePrice": "2337.054753806460857019192399957713",
        "stakedRomes": "1082.585261499"
      },
      {
        "epoch": "2",
        "id": "0xeca0d8cbf62a204cdf1c00926417c84cb454a46acb185753ced8a2c777c6d94b",
        "romePrice": "1428.443461784864234657330502300817",
        "stakedRomes": "147846.992661714"
      },
      {
        "epoch": "3",
        "id": "0x240d2ae4f08f2f38b4349d7147e866ae359b69041cb72f3cffa2435497248a21",
        "romePrice": "1386.008462014260078761077281710515",
        "stakedRomes": "163593.340265732"
      }
```

instead we are seeing results like this in the hosted serivce:
```json
      {
        "id": "0xfb7348358b3a06f24b7e9faa4925d2c2400f40b9f74a660aed20341bfb6d9f80",
        "epoch": "1",
        "stakedRomes": "217089.874171565",
        "romePrice": "379.49470033381879922633298595569"
      },
      {
        "id": "0xeca0d8cbf62a204cdf1c00926417c84cb454a46acb185753ced8a2c777c6d94b",
        "epoch": "2",
        "stakedRomes": "217096.341186172",
        "romePrice": "380.4399583489084275884790932539568"
      },
      {
        "id": "0x240d2ae4f08f2f38b4349d7147e866ae359b69041cb72f3cffa2435497248a21",
        "epoch": "3",
        "stakedRomes": "216990.318584742",
        "romePrice": "371.1343263152541721033060449872721"
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
