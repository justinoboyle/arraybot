"use strict";

module.exports = {
    aliases: ['eval'],
    description: 'Evaluates given string as JavaScript code.',
    permissionsRequired: true,
    allowedUsers: [ bot.owner ],
    hideFromHelp: true,
    emit: function (user, command, args, msgObj, platform) {
        let ret;
        try {
            ret = eval(args.join(' '));
        }catch(e) {
            ret = e;
        }
        bot.util.sendMessage(msgObj.channel, '```\n' + ret + '\n```');
    }
}