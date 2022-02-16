POC for purestake to demonstrate subgraph issue

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
