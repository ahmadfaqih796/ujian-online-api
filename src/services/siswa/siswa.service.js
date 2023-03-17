// Initializes the `siswa` service on path `/siswa`
const { Siswa } = require('./siswa.class');
const createModel = require('../../models/siswa.model');
const hooks = require('./siswa.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/siswa', new Siswa(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('siswa');

  service.hooks(hooks);
};
