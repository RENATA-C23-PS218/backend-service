#!/bin/bash

docker build . -f .docker/Dockerfile -t renata-app:latest
docker compose --env-file .env -f .docker/docker-compose.yml up -d 