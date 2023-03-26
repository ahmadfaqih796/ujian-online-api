// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get("sequelizeClient");
  const soal = sequelizeClient.define(
    "soal",
    {
      id_soal: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      kode_pelajaran: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kode_kelas: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      semester: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pertanyaan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pilihan_a: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pilihan_b: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pilihan_c: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pilihan_d: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pilihan_e: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kunci: {
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
  soal.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return soal;
};
