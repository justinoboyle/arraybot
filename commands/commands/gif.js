"use strict";

const giphy = require('giphy-api')();

module.exports = {
    aliases: ['gif'],
    description: 'Search for a gif!',
    emit: function (user, command, args, msgObj, platform) {
        if (args.length == 0)
            return bot.reply(msgObj, "```Usage: gif [topic]```");
        let topic = args.join(" ").toLowerCase().trim();
        giphy.random({
            tag: topic,
            rating: 'r',
            fmt: 'json'
        }, function (err, res) {
            if(err)
                return bot.reply(msgObj, "An error occured.. try again later?");
            if(!res)
                return;
            return bot.sendMessage(msgObj.channel, res.data.image_url);
        });
    }
}