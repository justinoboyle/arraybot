const exec = require('child_process').exec;
if (global.production)
    setInterval(() => {
        if (global.production)
            exec(`sh ` + __dirname + `/checkForPull.sh`,
                function (error, stdout, stderr) {
                    if (global.production)
                        if (stdout.toLowerCase().trim() == "need to pull")
                            bot.sendMessage(bot.owner, "Re-cloning and re-deploying. Be back in a minute or two! 👋");
                });
    }, 1000);
