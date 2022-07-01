const { mergeWithKey, concat } = require("ramda");

const concatValue = (k, l, r) => (k === "include" ? concat(l, r) : r);

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async (context) => {
    const sequelize = context.app.get("sequelizeClient");
    const { siswa } = sequelize.models;
    const include = [
      {
        attributes: { exclude: ["id_siswa", "createdAt", "updatedAt"] },
        model: siswa,
        as: "user_siswa",
      },
    ];

    const sequelizeOptions = mergeWithKey(
      concatValue,
      context.params.sequelize,
      { include, raw: false }
    );

    context.params.sequelize = sequelizeOptions;

    return context;
  };
};
