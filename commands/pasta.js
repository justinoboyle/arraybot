"use strict";

module.exports = {
    aliases: ['pasta'],
    description: 'Dump a copypasta',
    emit: function (user, command, args, msgObj, platform) {
        dbClient.query('SELECT * FROM PASTA ORDER BY RANDOM() LIMIT 1', function(err, resp) {
            if(err)
                return;
            bot.sendMessage(msgObj.channel, resp.rows[0].content);
        })
        
    }
}