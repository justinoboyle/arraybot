"use strict";

const pg = require('pg');
const express = require('express');

global.app = express();

global.__approot = __dirname;
global.config = require(__approot + '/config.json');

app.set('port', process.env.PORT || config.listenPort);
app.set('view engine', 'ejs');


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
        global.webHandler = require(__approot + '/web/main.js');
    });
} catch (e) {
    console.log(e);
    process.exit(1);
}

app.listen(app.get('port'), () => `Web server listening on port ${app.get('port')}`);