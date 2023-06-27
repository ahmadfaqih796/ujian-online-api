// Initializes the `dashboard` service on path `/dashboard`
const { Dashboard } = require('./dashboard.class');
const hooks = require('./dashboard.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/dashboard', new Dashboard(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('dashboard');

  service.hooks(hooks);
};
