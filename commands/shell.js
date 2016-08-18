"use strict";
const exec = require('child_process').exec;

module.exports = {
    aliases: ['shell'],
    description: 'Evaluates given string as shell code.',
    permissionsRequired: true,
    allowedUsers: [bot.owner],
    hideFromHelp: true,
    emit: function (user, command, args, msgObj, platform) {
        let cmd = args.join(' ')
        try {
            let output = [];
            let child = exec(cmd, (error, stdout, stderr) => {
                output.push(stdout);
                output.push(stderr);
                output.push(error);
            });
            child.on('exit', () => {
                setTimeout(() => {
                    bot.util.sendMessage(msgObj.channel, '```\n' + output.join('\n') + '\n```');
                }, 10);

            });
        } catch (e) {
            bot.util.sendMessage(msgObj.channel, '```\n' + e + '\n```');
        }

    }
}