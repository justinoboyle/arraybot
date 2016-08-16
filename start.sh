#!/bin/bash
npm install
while(true) do
    npm run production
    git fetch --all
    git reset --hard origin/master
    ./node_modules/npm-install-missing/bin/npm-install-missing
    npm run production
done