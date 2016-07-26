"use strict";

module.exports = {
    aliases: ['help', '?'],
    description: 'Display list of commmands!',
    emit: function (user, command, args, msgObj, platform) {
        bot.util.sendMessage(msgObj.channel, 'List of commands:' + getCommandList(), 30);
    }
}
function getCommandList() {
    let lines = [];
    for (let cmd of global.commands) {
        if (!cmd.hideFromHelp)
            try {
                lines.push(prefixes[0] + cmd.aliases[0] + ': ' + (cmd.description ? cmd.description : "No description"))
            } catch (e) { }
    }
    return '```\n' + lines.join('\n') + '\n```';
}