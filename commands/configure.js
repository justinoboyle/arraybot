"use strict";

dbClient.query("CREATE TABLE IF NOT EXISTS CHANNELTYPES(id TEXT, type TEXT)");

module.exports = {
    aliases: ['configure'],
    description: 'Configures a channel',
    permissionsRequired: true,
    allowedUsers: [bot.owner],
    hideFromHelp: true,
    emit: function (user, command, args, msgObj, platform) {
        let channel = msgObj.channel;
        if (args[0] === "channel") {
            dbClient.query("DELETE FROM CHANNELTYPES WHERE id=$1", [channel.id], (err, result) => {
                if (err)
                    return bot.reply(msgObj, "An error occurred.");
                dbClient.query("INSERT INTO CHANNELTYPES(id, type) VALUES($1, $2)", [channel.id, args[1]], (err, result) => {
                    if (err)
                        return bot.reply(msgObj, "An error occurred.");
                    return bot.reply(msgObj, "This channel is now a `" + args[1] + '` channel.');
                })
            })
            return;
        }
        bot.util.sendMessage(msgObj.channel, '```\n' + ret + '\n```');
    }
}