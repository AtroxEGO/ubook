#!/bin/bash
GIT_SSH_COMMAND="ssh -i /home/paul/.ssh/id25519.pub" git pull origin master
docker compose down
docker compose up -d --build