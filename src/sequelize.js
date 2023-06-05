const Sequelize = require("sequelize");

const { DB_SYNC } = process.env;

module.exports = function (app) {
  const connectionString = app.get("mysql");
  const sequelize = new Sequelize(connectionString, {
    dialect: "mysql",
    logging: false,
    define: {
      freezeTableName: true,
    },
  });
  const oldSetup = app.setup;

  app.set("sequelizeClient", sequelize);

  app.setup = function (...args) {
    const result = oldSetup.apply(this, args);

    // Set up data relationships
    const models = sequelize.models;
    Object.keys(models).forEach((name) => {
      if ("associate" in models[name]) {
        models[name].associate(models);
      }
    });

    // Sync to the database
    console.log("first", DB_SYNC);
    if (DB_SYNC === "true") {
      try {
        app.set(
          "sequelizeSync",
          sequelize.sync({ alter: true, logging: console.log })
        );
        console.log("done");
      } catch (error) {
        console.log(error);
      }
    }

    return result;
  };
};
