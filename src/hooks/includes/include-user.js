const { mergeWithKey, concat } = require("ramda");

const concatValue = (k, l, r) => (k === "include" ? concat(l, r) : r);

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async (context) => {
    const sequelize = context.app.get("sequelizeClient");
    const { users, admin } = sequelize.models;
    const include = [
      {
        attributes: ["email", "role"],
        model: users,
        as: "user_data",
        include: [
          {
            model: admin,
            as: "user_admin",
            attributes: { exclude: ["id_admin", "createdAt", "updatedAt"] },
          },
        ],
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
