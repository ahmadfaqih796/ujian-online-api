// Initializes the `excel-soal` service on path `/excel-soal`
const { ExcelSoal } = require('./excel-soal.class');
const hooks = require('./excel-soal.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/excel-soal', new ExcelSoal(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('excel-soal');

  service.hooks(hooks);
};
