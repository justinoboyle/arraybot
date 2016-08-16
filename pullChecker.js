const exec = require('child_process').exec;
let stop = false;
if (global.production)
    setInterval(() => {
        if (global.production)
            exec(`sh ` + __dirname + `/checkForPull.sh`,
                function (error, stdout, stderr) {
                    if (global.production && !stop)
                        if (stdout.toLowerCase().trim() == "need to pull") {
                            bot.sendMessage(bot.owner, "Re-cloning and re-deploying. Be back in a minute or two! 👋");
                            stop = true;
                            setTimeout(() => {
                                process.exit(0);
                            }, 1000);

                        }

                });
    }, 3000);

if (global.production)
    setInterval(() => {
        if (global.production && !stop)
            exec(`git remote update`,
                (error, stdout, stderr) => { });
    }, 2000);
