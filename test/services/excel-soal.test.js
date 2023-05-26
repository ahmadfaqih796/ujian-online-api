const assert = require('assert');
const app = require('../../src/app');

describe('\'excel-soal\' service', () => {
  it('registered the service', () => {
    const service = app.service('excel-soal');

    assert.ok(service, 'Registered the service');
  });
});
