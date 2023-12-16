const assert = require('assert');
const app = require('../../src/app');

describe('\'complaints\' service', () => {
  it('registered the service', () => {
    const service = app.service('complaints');

    assert.ok(service, 'Registered the service');
  });
});
