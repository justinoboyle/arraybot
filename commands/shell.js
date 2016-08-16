"use strict";
const exec = require('child_process').exec;

module.exports = {
    aliases: ['shell'],
    description: 'Evaluates given string as shell code.',
    permissionsRequired: true,
    allowedUsers: [ bot.owner ],
    hideFromHelp: true,
    emit: function (user, command, args, msgObj, platform) {
        let cmd = args.join(' ')
        try {
            let output = [];
            let child = exec(cmd, (error, stdout, stderr) => {
                output.push(stdout);
                output.push(stderr);
                output.push(error);
                // add stderror later... ehh...
            });
            child.on('exit', () => {
                bot.util.sendMessage(msgObj.channel, '```\n' + output.join('\n') + '\n```');
            });
        }catch(e) {
            bot.util.sendMessage(msgObj.channel, '```\n' + e + '\n```');
        }
        
    }
}