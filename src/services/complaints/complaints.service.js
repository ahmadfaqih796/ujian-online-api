// Initializes the `complaints` service on path `/complaints`
const { Complaints } = require('./complaints.class');
const createModel = require('../../models/complaints.model');
const hooks = require('./complaints.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/complaints', new Complaints(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('complaints');

  service.hooks(hooks);
};
