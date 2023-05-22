// eslint-disable-next-line no-unused-vars
const errors = require("@feathersjs/errors");
module.exports = () => {
  return async (context) => {
    const { result, app } = context;
    const { user, accessToken, authentication } = result;
    // delete result.authentication;

    const sequelize = app.get("sequelizeClient");
    const { admin, guru, siswa } = sequelize.models;

    const { id_user, role } = user;
    // admin
    const adminData = await admin.findOne({
      attributes: { exclude: ["id_admin", "createdAt", "updatedAt"] },
      where: {
        id_admin: id_user,
      },
    });
    // guru
    const guruData = await guru.findOne({
      attributes: { exclude: ["id_guru", "createdAt", "updatedAt"] },
      where: {
        id_guru: id_user,
      },
    });
    // siswa
    const siswaData = await siswa.findOne({
      attributes: { exclude: ["id_siswa", "createdAt", "updatedAt"] },
      where: {
        id_siswa: id_user,
      },
    });

    context.result = {
      message: "anda berhasil login",
      user,
      ...(role === "admin" && {
        admin: adminData,
      }),
      ...(role === "guru" && {
        guru: guruData,
      }),
      ...(role === "siswa" && {
        siswa: siswaData,
      }),
      // accessToken,
      authentication,
    };

    //  if (!context.result.user.isVerified) {
    //    // eslint-disable-next-line quotes
    //    throw new errors.Conflict("User is not approved by admin");
    //  }
    return context;
  };
};
