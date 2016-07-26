"use strict";

const unirest = require('unirest');

module.exports = {
    aliases: ['captcha'],
    description: 'Solve a captcha!',
    emit: function (user, command, args, msgObj, platform) {
        if (args.length == 0)
            return msgObj.reply('Usage: `!a captcha [captcha link]');
        let captchaLink = args.join(' ').trim();
        unirest.get("https://metropolis-api-captcha.p.mashape.com/solve?image=" + encodeURIComponent(captchaLink))
            .header("X-Mashape-Key", "GZe96kzVrgmshRNxwd3Y0GA64EeTp1zfZzPjsnUwA7z1XCtjmt")
            .header("Accept", "application/json")
            .end(function (result) {
                msgObj.reply(result.body.captcha)
            });
    }
}