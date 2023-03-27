// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get("sequelizeClient");
  const siswa = sequelizeClient.define(
    "siswa",
    {
      id_siswa: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nama_siswa: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nis: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kelamin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      agama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tempat_lahir: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tanggal_lahir: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      alamat: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      no_telepon: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: false,
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
  siswa.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return siswa;
};
