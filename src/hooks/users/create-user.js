const errors = require("@feathersjs/errors");

module.exports = () => {
  return async (context) => {
    const { app, result, data } = context;
    const sequelize = app.get("sequelizeClient");
    const { guru, siswa } = sequelize.models;
    // result
    const { id_user, role } = result;
    // data
    const { agama, photo, name } = data;
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
        photo: photo,
        agama: agama,
      });
    }
    return context;
  };
};
