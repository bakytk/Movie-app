#!/usr/bin/env sh

set -e

# display var
echo "IS_GITHUB_ACTION:" && printenv IS_GITHUB_ACTION;

if [ "$IS_GITHUB_ACTION" = "true" ]; then
  # env=github_workflows => just test
  npm test;
else
  # env=local_env => check server in-depth
  npm start
fi

# if [ ! -f .env ]
# then
#   export $(cat .env | xargs)
# fi
