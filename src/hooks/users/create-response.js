const errors = require("@feathersjs/errors");

module.exports = () => {
  return async (context) => {
    const { data, app } = context;

    const isEmailValid = await app.service("users").Model.findOne({
      where: {
        email: data.email,
      },
    });
    // const isNIKValid = await app.service("users").Model.findOne({
    //   where: {
    //     nik: data.nik,
    //   },
    // });
    if (isEmailValid) {
      throw new errors.Conflict("Email ini sudah digunakan");
    }
    // if (isNIKValid) {
    //   throw new errors.Conflict("Nik ini sudah digunakan");
    // }

    return context;
  };
};
