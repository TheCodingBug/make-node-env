const { SyncConfig, AsyncConfig } = require('../lib/index.js');
const path = require('path');

const syncConfg = path.resolve(__dirname + `/config2.json`);
exports.syncConfig = SyncConfig({ path: syncConfg, debug: true });

const asyncConfg = path.resolve(__dirname + `/config.json`);
exports.asyncConfig = async function () {
    return await AsyncConfig({ path: asyncConfg, debug: true })
};