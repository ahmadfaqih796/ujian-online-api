// eslint-disable-next-line no-unused-vars
const errors = require("@feathersjs/errors");
module.exports = () => {
  return async (context) => {
    const { result, app } = context;
    const { user, accessToken } = result;
    delete result.authentication;
    console.log("xxxxx", result);

    const sequelize = app.get("sequelizeClient");
    const { siswa, guru } = sequelize.models;

    const siswaData = await siswa.findOne({
      where: {
        id_siswa: result.user.id_user,
      },
    });

    const guruData = await guru.findOne({
      where: {
        id_siswa: result.user.id_user,
      },
    });

    context.result = {
      message: "anda berhasil",
      user,
      ...(result.user.role === "siswa" && {
        siswa: siswaData,
      }),
      ...(result.user.role === "guru" && {
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
