const { mergeWithKey, concat } = require("ramda");

const concatValue = (k, l, r) => (k === "include" ? concat(l, r) : r);

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async (context) => {
    const { app, params } = context;
    const sequelize = app.get("sequelizeClient");
    const { siswa } = sequelize.models;
    const { query } = params;
    const include = [
      {
        attributes: { exclude: ["id_siswa", "createdAt", "updatedAt"] },
        model: siswa,
        as: "user_siswa",
        ...(query.name_user && {
          where: {
            nama_siswa: {
              $like: `%${query.name_user}%`,
            },
          },
        }),
      },
    ];
    if (query.name_user) delete context.params.query.name_user;

    const sequelizeOptions = mergeWithKey(
      concatValue,
      context.params.sequelize,
      { include, raw: false }
    );

    context.params.sequelize = sequelizeOptions;

    return context;
  };
};
