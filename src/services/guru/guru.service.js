// Initializes the `guru` service on path `/guru`
const { Guru } = require('./guru.class');
const createModel = require('../../models/guru.model');
const hooks = require('./guru.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/guru', new Guru(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('guru');

  service.hooks(hooks);
};
