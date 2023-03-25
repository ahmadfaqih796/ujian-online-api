const assert = require('assert');
const app = require('../../src/app');

describe('\'kelas\' service', () => {
  it('registered the service', () => {
    const service = app.service('kelas');

    assert.ok(service, 'Registered the service');
  });
});
