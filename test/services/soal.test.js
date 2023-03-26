const assert = require('assert');
const app = require('../../src/app');

describe('\'soal\' service', () => {
  it('registered the service', () => {
    const service = app.service('soal');

    assert.ok(service, 'Registered the service');
  });
});
