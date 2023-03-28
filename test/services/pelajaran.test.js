const assert = require('assert');
const app = require('../../src/app');

describe('\'pelajaran\' service', () => {
  it('registered the service', () => {
    const service = app.service('pelajaran');

    assert.ok(service, 'Registered the service');
  });
});
