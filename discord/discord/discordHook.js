"use strict";

const Discord = require('discord.js'),
    fs = require('fs'),
    util = require('util');

global.bot = new Discord.Client();
global.prefixes = ['!a '];

bot.owner = '185834351416705024';

getBotHandlers();

bot.util = require(__approot + '/utils/botExt.js');

bot.loginWithToken(global.config.discord.auth.token);

function getBotHandlers() {
    fs.readdir(__dirname + '/handle', function (err, items) {
        if (err) {
            console.error(err);
            return process.exit(1);
        }
        let temp = {};
        for (let x of items)
            try {
                console.log(__dirname + '/handle/' + x)
                let handler = require('./handle/' + x);
                bot.on(handler.hook, handler.emit);
                console.log("registered handler " + temp[x]);
            } catch (e) {
                console.error(util.inspect(e));
            }
    })
}
