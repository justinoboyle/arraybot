"use strict";

const requestify = require('requestify');
let after = 't3_4mu7rz';
try {
    dbClient.query("CREATE TABLE IF NOT EXISTS PASTA(origin TEXT, content TEXT)")
}catch(e) {}
function runFor() {
    console.log("running");
    requestify.get('https://www.reddit.com/r/copypasta/new.json?sort=top' + (after !== '' ? '&after=' + after : ''))
        .then(function (response) {
            try {
                let data = response.getBody().data;
                console.log('new after: ' + data.after);
                after = data.after;
                for (let item of data.children)
                    addToDatabase(item.data.selftext, item.data.permalink);
                setTimeout(function () {
                    runFor();
                }, 5 * 1000);
            } catch (e) {
                console.log(e);
            }
        });
}

function addToDatabase(text, permalink) {
    if(text.length > 1950)
        return;
    text = text.trim();
    dbClient.query('INSERT INTO pasta(origin, content) VALUES($1, $2)', [permalink, text]);
}

runFor();