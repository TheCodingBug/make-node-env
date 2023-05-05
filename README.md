# make-node-env
Make use of json file formatting for handling node environment configs.

# Setup
```
/**
 * Using Sync configuration loading
 */
const syncConfg = path.resolve(__dirname + `/config2.json`);
exports.syncConfig = SyncConfig({ path: syncConfg, debug: true });

/**
 * Using Async configuration loading
 */
const asyncConfg = path.resolve(__dirname + `/config.json`);
exports.asyncConfig = async function () {
    return await AsyncConfig({ path: asyncConfg, debug: true })
};
```

# Usage sample with Jest test
```
const { syncConfig, asyncConfig } = require('./index.js');

test('Configuration using sync load with config2.json', function () {
  const host = syncConfig.get('api.host');
  expect(host).toMatchObject({
    "url": "https://www.sync.com",
    "port": 9000,
    "hasSSL": true
  })

  const value = syncConfig.get('api.host.hasSSL');
  expect(value).toBe(true);
});

test('Configuration using async load with config.json', function () {
  async function load() {
    const config = await asyncConfig();

    const host = config.get('webURLs.api.host');
    expect(host).toMatchObject({
      "url": "https://www.host.com",
      "port": 9000,
      "hasSSL": true
    })

    const value = config.get('webURLs.api.host.hasSSL');
    expect(value).toBe(true);
  }

  load();
});
```

# Jest Test

<img width="563" alt="Screenshot 2023-05-05 at 8 55 00 PM" src="https://user-images.githubusercontent.com/8805997/236463993-4ab9e449-f28c-45a0-b15f-8b30630d889a.png">
