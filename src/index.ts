const { readFile } = require('fs/promises');
const { readFileSync } = require('fs');

export interface Options {
    path: string,
    debug: boolean
}

export interface CObject {
    [key: string]: any
}

export class ConfigJSON {
    #record: CObject | null = null
    constructor(record: CObject | null = null) {
        this.#record = record;
    }

    log(): void {
        console.log(`Configuration: `, this.#record);
    }

    get(path: string): CObject | null {
        const keys: string[] = path.split('.');
        let tempObj: CObject = this.#record || {};
        for (const key of keys) {
            if (typeof tempObj === 'object') {
                tempObj = tempObj[key];
            } else {
                return null;
            }
        }
        return tempObj;
    }
}

export class SyncConfigJSON extends ConfigJSON {
    #record: CObject | null = null
    constructor(record: CObject | null = null) {
        super(record);
    }

    static init({ path, debug = false }: Options): ConfigJSON {
        try {
            const data = readFileSync(path, 'utf8');
            return new SyncConfigJSON(JSON.parse(data));
        } catch (err) {
            if (debug) console.log(`Load config failed at: ${path}\nError: `, err);
            throw err;
        }
    }
}

export class AsyncConfigJSON extends ConfigJSON {
    #record: CObject | null = null
    constructor(record: CObject | null = null) {
        super(record);
    }

    static async init({ path, debug = false }: Options): Promise<ConfigJSON> {
        const data = await readFile(path, 'utf8');
        if (debug && !data) console.log(`Load config failed at: `, path);
        return new AsyncConfigJSON(JSON.parse(data));
    }
}

function SyncConfig(options: Options) {
    return SyncConfigJSON.init(options);
}

async function AsyncConfig(options: Options) {
    return await AsyncConfigJSON.init(options);
}

module.exports = { SyncConfig, AsyncConfig };