const assert = require('assert');
const app = require('../../src/app');

describe('\'guru\' service', () => {
  it('registered the service', () => {
    const service = app.service('guru');

    assert.ok(service, 'Registered the service');
  });
});
