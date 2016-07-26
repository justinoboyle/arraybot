"use strict";

module.exports = {
    aliases: ['help', '?'],
    description: 'Display list of commmands!',
    emit: function (user, command, args, msgObj, platform) {
        bot.util.sendMessage(msgObj.channel, 'List of commands:' + getCommandList(), 30);
    }
}