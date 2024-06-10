#!/bin/bash

# Change to the directory containing your Docker Compose project
cd /path/to/your/project || exit

# Pull changes from the GitHub repository
if GIT_SSH_COMMAND="ssh -i /home/paul/.ssh/id_ed25519.pub" git pull origin master; then
    # If git pull was successful, proceed with Docker Compose commands
    echo "[UBook-Redeploy] Git pull successful. Proceeding with Docker Compose commands."

    # Rebuild Docker Compose services
    docker compose down
    docker compose up -d --build
else
    # If git pull failed, exit with an error message
    echo "[UBook-Redeploy] Git pull failed. Aborting Docker Compose commands."
    exit 1
fi