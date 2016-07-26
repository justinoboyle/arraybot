"use strict";
const requestify = require('requestify');
const request = require('request');
const imgur = require('imgur');
const fs = require('fs');
imgur.setClientId(global.config.imgur.key);
let currentServer = "";

const download = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

let actions = {
    connect: function (user, command, args, msgObj, platform) {
        currentServer = args.join(' ').trim();
        request(currentServer + '/ping', function (error, response, body) {
            let resp = JSON.parse(body);
            if (resp.success)
                return bot.reply(msgObj, '```\n' + 'Connected successfully' + '\n```');
            else
                return bot.reply(msgObj, '```\n' + 'Connection failure' + '\n```');
        })
    },
    req: function (user, command, args, msgObj, platform) {
        if (currentServer === '')
            return bot.reply(msgObj, 'Not connected to a server! Use `!a game connect [server]`!');
        request(currentServer + '/' + encodeURIComponent(args.join(' ').trim()), function (error, response, body) {
            return bot.reply(msgObj, '```json\n' + JSON.stringify(JSON.parse(body), null, 4) + '\n```');
        })
    },
    screenshot: function (user, command, args, msgObj, platform) {
        let time = Date.now();
        let name = __approot + '/temp/temp' + Math.floor(Math.random() * 10000).toString() + '.png';
        download(currentServer + '/screenshot', name, function () {
            console.log("Download took " + (Date.now() - time) + "ms");
            time = Date.now();
            imgur.uploadFile(name)
                .then(function (json) {
                    console.log("Upload took " + (Date.now() - time) + "ms");
                    fs.unlink(name);
                    return bot.sendMessage(msgObj.channel, json.data.link);
                })
                .catch(function (err) {
                    console.log(err);
                    return bot.reply(msgObj, "Oops! An error occured!");
                });
        });
    }
};


module.exports = {
    aliases: ['game'],
    description: 'Connect to game',
    permissionsRequired: false,
    hideFromHelp: false,
    emit: function (user, command, args, msgObj, platform) {
        let action = args.shift();
        console.log(action);
        try {
            return actions[action](user, command, args, msgObj, platform);
        } catch (e) {
            console.log(e);
            bot.reply(msgObj, "unknown argument");
        }
    }
}

