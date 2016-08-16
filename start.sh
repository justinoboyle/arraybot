#!/bin/bash
while(true) do
    npm run production
    git fetch --all
    git reset --hard origin/master
    npm install
    npm run production
done