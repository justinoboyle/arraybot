"use strict";

const Discord = require("discord.js");

const mic = require(__approot + '/microphone.js');

module.exports = {
    aliases: ['call'],
    description: 'Evaluates given string as JavaScript code.',
    permissionsRequired: true,
    allowedUsers: [bot.owner],
    hideFromHelp: true,
    emit: function (user, command, args, msgObj, platform) {
        if (args.length == 0)
            return msgObj.reply("Usage: ```!a call [number]```");
        if (args[0].toLowerCase() === "leave") {
            bot.internal.leaveVoiceChannel();
            mic.stopCapture();
            return bot.reply(msgObj, "Leaving voice. Goodbye!");
        }
        // this is work in process bullshit code that literally does nothing
        for (let channel of msgObj.channel.server.channels) {
            if (!channel instanceof Discord.VoiceChannel)
                continue;
            mic.startCapture();
            mic.audioStream.on('data', function (data) {
                process.stdout.write(data);
            });
            bot.reply(msgObj, channel.name + " - " + channel.id);
            bot.joinVoiceChannel(channel);
            break;
        }
    }
}