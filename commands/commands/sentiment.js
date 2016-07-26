"use strict";

const apiai = require('apiai');
const app = apiai(global.config.apiai.client);

module.exports = {
    aliases: ['sentiment'],
    description: 'Test command',
    emit: function (user, command, args, msgObj, platform) {
        let request = app.textRequest(args.join(' '));
        console.log('request: ' + args.join(' '));
        request.on('response', function (response) {
            console.log(response);
            let sec = [
                "Action: " + response.result.action,
                "Parameters: " + JSON.stringify(response.result.parameters),
            ];
            bot.util.reply(msgObj, '```\n' + sec.join('\n') + '\n```');
        });

        request.on('error', function (error) {
            console.log(error);
            bot.util.reply(msgObj, 'Uh oh, check stdout!');
        });

        request.end();
    }
}