// Initializes the `export/users` service on path `/export/users`
const generateExcelWorkbook = require("../../../hooks/module/generate-excel-workbook");
const { Users } = require("./users.class");
const hooks = require("./users.hooks");

module.exports = function (app) {
  const options = {
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use("/export/users", new Users(options, app), generateExcelWorkbook());

  // Get our initialized service so that we can register hooks
  const service = app.service("export/users");

  service.hooks(hooks);
};
