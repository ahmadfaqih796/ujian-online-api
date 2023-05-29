const errors = require("@feathersjs/errors");

module.exports = () => {
  return async (context) => {
    const { app, result, data } = context;
    const sequelize = app.get("sequelizeClient");
    const { admin, guru, siswa } = sequelize.models;
    const { id_user, role } = result;
    const { agama, photo, name, nik, nip } = data;
    // create admin
    if (role === "admin") {
      await admin.create({
        id_admin: id_user,
        nama_admin: name,
        photo: photo,
        is_active: 1,
      });
    }
    // create guru
    if (role === "guru") {
      await guru.create({
        id_guru: id_user,
        nama_guru: name,
        photo: photo,
        agama: agama,
        nip: nip,
      });
    }
    // create siswa
    if (role === "siswa") {
      await siswa.create({
        id_siswa: id_user,
        nama_siswa: name,
        photo: photo,
        agama: agama,
        nik: nik,
      });
    }
    return context;
  };
};
