const assert = require('assert');
const app = require('../../src/app');

describe('\'siswa\' service', () => {
  it('registered the service', () => {
    const service = app.service('siswa');

    assert.ok(service, 'Registered the service');
  });
});
