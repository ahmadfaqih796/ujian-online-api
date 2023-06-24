const errors = require("@feathersjs/errors");

module.exports = () => {
  return async (context) => {
    const { app, data } = context;
    const sequelize = app.get("sequelizeClient");
    const { users } = sequelize.models;
    const email = data.email;
    const isEmailValid = await users.findOne({
      where: {
        email: email,
      },
    });
    if (isEmailValid) {
      throw new errors.Conflict("Email ini sudah digunakan");
    }
    return context;
  };
};
