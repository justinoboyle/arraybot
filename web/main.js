"use strict";

dbClient.query("CREATE TABLE IF NOT EXISTS SCAMMER_ENTRIES(id text, title text, url text, info text, comments text)");

app.get('/', (req, res) => res.render(__approot + '/templates/index.ejs'));
app.get('/out/:url*', (req, res) => res.render(__approot + '/templates/scammers/warning.ejs', {
    url: req.params.url,
    hostname: req.params.url
}));