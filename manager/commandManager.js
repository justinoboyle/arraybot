"use strict";

module.exports = {};

const cmdRoot = __approot + '/commands',
    fs = require('fs'),
    util = require('util');
global.commands = [];

getCommandHandlers();

module.exports.onCommand = function (user, command, args, msg, platform) {
    let localCmd = getCommand(command);
    if(!localCmd)
        return;
    let allowed = !localCmd.permissionsRequired;
    if(localCmd.permissionsRequired)
        for(let allow of localCmd.allowedUsers)
            if(user.id === allow) {
                allowed = true;
                break;
            }
    if(!allowed)
        return bot.reply(msg, '⛔ You do not have permission to use that command!');
        
    localCmd.emit(user, command, args, msg, platform);
}

function getCommand(command) {
    for (let cmd of commands)
        try {
            for (let alias of cmd.aliases)
                if (alias.toLowerCase() === command.toLowerCase())
                    return cmd;
        } catch (e) { console.log(e); }
    return false;
}

function getCommandHandlers() {
    fs.readdir(cmdRoot, function (err, items) {
        if (err) {
            console.error(err);
            return process.exit(1);
        }
        let temp = {};
        for (let x of items)
            try {
                commands.push(require(cmdRoot + '/' + x));
            } catch (e) {
                console.error(util.inspect(e));
            }
    })
}
