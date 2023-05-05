"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncConfigJSON = exports.SyncConfigJSON = exports.ConfigJSON = void 0;
const { readFile } = require('fs/promises');
const { readFileSync } = require('fs');
class ConfigJSON {
    #record = null;
    constructor(record = null) {
        this.#record = record;
    }
    log() {
        console.log(`Configuration: `, this.#record);
    }
    get(path) {
        const keys = path.split('.');
        let tempObj = this.#record || {};
        for (const key of keys) {
            if (typeof tempObj === 'object') {
                tempObj = tempObj[key];
            }
            else {
                return null;
            }
        }
        return tempObj;
    }
}
exports.ConfigJSON = ConfigJSON;
class SyncConfigJSON extends ConfigJSON {
    #record = null;
    constructor(record = null) {
        super(record);
    }
    static init({ path, debug = false }) {
        try {
            const data = readFileSync(path, 'utf8');
            return new SyncConfigJSON(JSON.parse(data));
        }
        catch (err) {
            if (debug)
                console.log(`Load config failed at: ${path}\nError: `, err);
            throw err;
        }
    }
}
exports.SyncConfigJSON = SyncConfigJSON;
class AsyncConfigJSON extends ConfigJSON {
    #record = null;
    constructor(record = null) {
        super(record);
    }
    static async init({ path, debug = false }) {
        const data = await readFile(path, 'utf8');
        if (debug && !data)
            console.log(`Load config failed at: `, path);
        return new AsyncConfigJSON(JSON.parse(data));
    }
}
exports.AsyncConfigJSON = AsyncConfigJSON;
function SyncConfig(options) {
    return SyncConfigJSON.init(options);
}
async function AsyncConfig(options) {
    return await AsyncConfigJSON.init(options);
}
module.exports = { SyncConfig, AsyncConfig };
//# sourceMappingURL=index.js.map