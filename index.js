"use strict";

const pg = require('pg');

global.__approot = __dirname;
global.config = require(__approot + '/config.json');

global.production = false;

for(let x of process.argv)
    if(x.toLowerCase() == "production")
        global.production = true;

console.log("Production mode: " + global.production);
global.dbClient = undefined;
try {
    global.dbClient = new pg.Client(config.databaseURI);
    dbClient.connect(function (err) {
        if (err)
            return console.log(err);
        console.log("Connected to Postgres!");
        // require('./pastascript.js');
        global.discordHook = require(__approot + '/discord/discordHook.js');
        global.pullChecker = require(__approot + '/pullChecker.js');
    });
} catch (e) {
    console.log(e);
    process.exit(1);
}

