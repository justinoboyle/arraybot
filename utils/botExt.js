"use strict";

const util = require('util');

module.exports = {};

module.exports.reply = function (original, resp, timeout = -1) {
    console.log(util.inspect(bot.reply(original, resp)));
}
module.exports.sendMessage = function (channel, msg, timeout = -1) {
    bot.sendMessage(channel, msg + (timeout !== -1 ? '\n*This message will expire in ' + timeout + ' seconds*' : ''), function (error, message) {
        if(error)
            return;
        if(timeout !== -1)
            setTimeout(function() {
                message.author.client.deleteMessages([message]);
            }, 1000 * (timeout))
        
    })
};

global.printProp = (obj, ind = 0, recur = 0) => {
     let indentChars = new Array(ind).join(' '); 
     let temp = []; 
     for(let x in obj) 
     if(typeof(obj[x]) !== "function") 
     try {
         temp.push(indentChars + x + ": " + obj[x]); 
     }catch(e) {
         if(recur < 10)
            temp.push(indentChars + x + ": " + global.printProp(obj[x], ind+1, recur+1));
        console.log(e);
     }
     
     return temp.join('\n'); 
}