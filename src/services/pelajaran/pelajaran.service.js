// Initializes the `pelajaran` service on path `/pelajaran`
const { Pelajaran } = require('./pelajaran.class');
const createModel = require('../../models/pelajaran.model');
const hooks = require('./pelajaran.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/pelajaran', new Pelajaran(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('pelajaran');

  service.hooks(hooks);
};
