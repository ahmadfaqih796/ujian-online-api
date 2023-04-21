// eslint-disable-next-line no-unused-vars
const errors = require("@feathersjs/errors");
module.exports = () => {
  return async (context) => {
    const { result, app } = context;
    const { user, accessToken } = result;
    // delete result.authentication;

    const sequelize = app.get("sequelizeClient");
    const { siswa, guru } = sequelize.models;

    const { id_user, role } = user;
    const siswaData = await siswa.findOne({
      where: {
        id_siswa: id_user,
      },
    });

    const guruData = await guru.findOne({
      where: {
        id_guru: id_user,
      },
    });

    context.result = {
      message: "anda berhasil login",
      user,
      ...(role === "siswa" && {
        siswa: siswaData,
      }),
      ...(role === "guru" && {
        guru: guruData,
      }),
      accessToken,
    };

    //  if (!context.result.user.isVerified) {
    //    // eslint-disable-next-line quotes
    //    throw new errors.Conflict("User is not approved by admin");
    //  }
    return context;
  };
};
