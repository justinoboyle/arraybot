"use strict";

module.exports = {
    aliases: ['reclone'],
    description: 'Shuts down and re-clones!',
    permissionsRequired: true,
    allowedUsers: [bot.owner],
    hideFromHelp: true,
    emit: function (user, command, args, msgObj, platform) {
        if (!global.production)
            return bot.reply(msgObj, "This can only be done on a production server.");
        bot.reply(msgObj, "Be back in a minute or two! 👋");
        setTimeout(() => {
            process.exit(0);
        }, 2000);
    }
}