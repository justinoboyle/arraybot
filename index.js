"use strict";

global.__approot = __dirname;
global.config = require(__approot + '/config.json');

const discordHook = require(__approot + '/discord/discordHook.js');