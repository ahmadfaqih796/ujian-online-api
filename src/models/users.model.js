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
      // nik: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
      name: {
        type: DataTypes.STRING,
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
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true,
      },
      // umur: {
      //   type: DataTypes.STRING,
      // },
      // kelas: {
      //   type: DataTypes.STRING,
      // },
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

    // users.hasOne(models.siswa, {
    //   foreignKey: "id_siswa",
    //   as: "user_siswa",
    // });
    // siswa
    users.belongsTo(models.siswa, {
      foreignKey: "id_user",
      as: "user_siswa",
    });

    // guru
    users.belongsTo(models.guru, {
      foreignKey: "id_user",
      as: "user_guru",
    });
  };

  return users;
};
