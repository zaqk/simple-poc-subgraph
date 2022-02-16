#!/bin/bash

DOCKER="$(dirname -- "$0")/docker-compose.yml"

docker-compose -f $DOCKER down
rm -rf data
docker-compose -f $DOCKER up -V --force-recreate
