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