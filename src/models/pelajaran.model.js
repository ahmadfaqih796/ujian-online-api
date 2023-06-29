// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get("sequelizeClient");
  const pelajaran = sequelizeClient.define(
    "pelajaran",
    {
      id_pelajaran: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      nama_pelajaran: {
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
  pelajaran.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
    pelajaran.hasMany(models.soal, {
      as: "question",
      foreignKey: "kode_pelajaran",
    });
  };

  return pelajaran;
};
