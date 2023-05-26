// Initializes the `soal` service on path `/soal`
const { Soal } = require("./soal.class");
const createModel = require("../../models/soal.model");
const hooks = require("./soal.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
    multi: ["create", "patch", "remove"],
  };

  // Initialize our service with any options it requires
  app.use("/soal", new Soal(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("soal");

  service.hooks(hooks);
};
