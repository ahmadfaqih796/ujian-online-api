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
      // username: {
      //   type: DataTypes.STRING,
      // },
      // password: {
      //   type: DataTypes.STRING,
      // },
      nama_siswa: {
        type: DataTypes.STRING,
      },
      nis: {
        type: DataTypes.STRING,
      },
      kelamin: {
        type: DataTypes.STRING,
      },
      agama: {
        type: DataTypes.STRING,
      },
      tempat_lahir: {
        type: DataTypes.STRING,
      },
      tanggal_lahir: {
        type: DataTypes.STRING,
      },
      alamat: {
        type: DataTypes.STRING,
      },
      no_telepon: {
        type: DataTypes.STRING,
      },
      photo: {
        type: DataTypes.STRING,
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
