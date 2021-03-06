"use strict";

const util = require('util'),
     commandManager = require(__approot + '/manager/commandManager.js'),
     fs = require('fs');

module.exports = {};
const shadowBannedUsers = [
    '138434663986233344'
];
module.exports.hook = 'message';
module.exports.emit = function (msg) {
    if(msg.author.bot || msg.author == global.config.discord.auth.id)
        return;

    for(let x of shadowBannedUsers)
        if(msg.author.id === x)
            return;
    if(global.production)
        if(msg.content.includes('(╯°□°）╯︵ ┻━┻'))
            return msg.reply('┬──┬ ノ( ゜-゜ノ)');
    let isPrefixed = false;
    let prefix = '';
    for(let pfx of prefixes)
        if(msg.content.toLowerCase().startsWith(pfx.toLowerCase())) {
            prefix = pfx;
            isPrefixed = true;
            break;
        } 
    if(!isPrefixed)
        return;
    let cmd = msg.content.substring(prefix.length);
    let expl = cmd.split(' ');
    let command = expl[0].toLowerCase();
    expl.shift();

    try {
        commandManager.onCommand({ id: msg.author.id, discord: msg.author }, command, expl, msg, "discord");
    }catch(ex) {
        console.log(ex);
    }
};