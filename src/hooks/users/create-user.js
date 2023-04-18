const errors = require("@feathersjs/errors");

module.exports = () => {
  return async (context) => {
    const { app, result } = context;
    const sequelize = app.get("sequelizeClient");
    const { guru, siswa } = sequelize.models;
    const { id_user, name, role } = result;
    // create guru
    if (role === "guru") {
      await guru.create({
        id_guru: id_user,
        nama_guru: name,
      });
    }
    // create siswa
    if (role === "siswa") {
      await siswa.create({
        id_siswa: id_user,
        nama_siswa: name,
      });
    }
    return context;
  };
};
