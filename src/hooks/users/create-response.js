const errors = require("@feathersjs/errors");

module.exports = () => {
  return async (context) => {
    console.log("dataaaa", context);
    const { data, app } = context;
    // const user = await app.service("users").Model.findOne({
    //   ...(data.email && {
    //     where: {
    //       email: data.email,
    //     },
    //   }),
    //   ...(data.nik && {
    //     where: {
    //       nik: data.nik,
    //     },
    //   }),
    // });
    // throw new errors.BadRequest(user);

    const isEmailValid = await app.service("users").Model.findOne({
      where: {
        email: data.email,
      },
    });
    const isNIKValid = await app.service("users").Model.findOne({
      where: {
        nik: data.nik,
      },
    });
    if (isEmailValid) {
      throw new errors.Conflict("email tidak boleh sama");
    }
    if (isNIKValid) {
      throw new errors.Conflict("Nik tidak boleh sama");
    }

    return context;
  };
};
