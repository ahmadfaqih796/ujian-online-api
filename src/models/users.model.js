// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get("sequelizeClient");
  const users = sequelizeClient.define(
    "users",
    {
      id_user: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // reset password
      resetAttempts: {
        type: DataTypes.INTEGER,
        field: "resetAttempts",
      },
      verifyToken: {
        type: DataTypes.STRING,
        field: "verifyToken",
      },
      verifyShortToken: {
        type: DataTypes.STRING,
        field: "verifyShortToken",
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        field: "isVerified",
      },
      verifyExpires: {
        type: DataTypes.DATE,
        field: "verifyExpires",
      },
      verifyChanges: {
        type: DataTypes.STRING,
        field: "verifyChanges",
        get() {
          const value = this.getDataValue("verifyChanges") || "{}";
          const parsedValue = JSON.parse(value);

          return parsedValue;
        },
        set(value) {
          this.setDataValue("verifyChanges", JSON.stringify(value));
        },
      },
      resetToken: {
        type: DataTypes.STRING,
        field: "resetToken",
      },
      resetShortToken: {
        type: DataTypes.STRING,
        field: "resetShortToken",
      },
      resetExpires: {
        type: DataTypes.DATE,
        field: "resetExpires",
      },
    },
    {
      hooks: {
        beforeCount(options) {
          options.raw = true;
        },
      },
    }
  );

  // eslint-disable-next-line no-unused-vars
  users.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
    users.hasOne(models.admin, {
      foreignKey: "id_admin",
      as: "user_admin",
    });
    users.hasOne(models.guru, {
      foreignKey: "id_guru",
      as: "user_guru",
    });
    users.hasOne(models.siswa, {
      foreignKey: "id_siswa",
      as: "user_siswa",
    });
  };

  return users;
};
