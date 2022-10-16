const errors = require("@feathersjs/errors");

module.exports = () => {
  return async (context) => {
    const { app, result } = context;
    const sequelize = app.get("sequelizeClient");
    const { users, siswa } = sequelize.models;
    const { id_user, name } = result;
    if (result.role === "siswa") {
      return await siswa.create({
        id_siswa: id_user,
        nama_siswa: name,
      });
    }

    return context;
  };
};
