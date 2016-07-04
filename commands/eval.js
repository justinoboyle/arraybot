"use strict";

module.exports = {
    aliases: ['eval'],
    description: 'Evaluates given string as JavaScript code.',
    permissionsRequired: true,
    allowedUsers: [ bot.owner ],
    hideFromHelp: true,
    emit: function (user, command, args, msgObj, platform) {
        bot.util.sendMessage(msgObj.channel, '```\n' + eval(args.join(' ')) + '\n```');
    }
}