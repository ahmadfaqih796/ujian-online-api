// Initializes the `admin` service on path `/admin`
const { Admin } = require('./admin.class');
const createModel = require('../../models/admin.model');
const hooks = require('./admin.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/admin', new Admin(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('admin');

  service.hooks(hooks);
};
