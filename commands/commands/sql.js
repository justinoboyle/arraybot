"use strict";

const requestify = require('requestify');

module.exports = {
    aliases: ['sql', 'pg', 'sqlsilent', 'sqlpaste'],
    description: 'Postgres query',
    permissionsRequired: true,
    allowedUsers: [global.bot.owner],
    hideFromHelp: true,
    emit: function (user, command, args, msgObj, platform) {
        let paste = command.toLowerCase() === 'sqlpaste';

        global.dbClient.query(args.join(' '), function (err, resp) {
            if (err)
                return global.bot.sendMessage(msgObj.channel, '```\nError: ' + err.error + '\n```');

            if (!resp.rows || (resp.rows && resp.rows.length === 0))
                return ret(msgObj, false, {}, 0, paste);

            if (command.toLowerCase() === 'sqlsilent')
                return global.bot.sendMessage(msgObj.channel, '```\nSuccess.\nReturned ' + resp.rows.length + ' rows.\n```');

            return ret(msgObj, false, resp.rows, resp.rows.length, paste);

        });

    }
}

function ret(msgObj, isError, resp, rowCount, shouldPaste) {
    if (isError)
        return global.bot.sendMessage(msgObj.channel, '```\nError: ' + resp + '\n```');
    if (!shouldPaste)
        return global.bot.util.sendMessage(msgObj.channel, [
            '```',
            'Success.',
            'Returned ' + resp.length + ' rows.',
            JSON.stringify(resp, null, 4),
            '```'
        ].join('\n'));
        console.log("Posting.....");
        console.log(JSON.stringify(resp, null, 4));
    requestify.post('http://rand0m.site/post', {
        data: JSON.stringify(resp, null, 4),
        redirect: 'false'
    }).then((response) => { 
        console.log("DONE")
        return global.bot.sendMessage(msgObj.channel, 'http://rand0m.site/raw/' + response.getBody());
    });
}