// Initializes the `kelas` service on path `/kelas`
const { Kelas } = require('./kelas.class');
const createModel = require('../../models/kelas.model');
const hooks = require('./kelas.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/kelas', new Kelas(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('kelas');

  service.hooks(hooks);
};
