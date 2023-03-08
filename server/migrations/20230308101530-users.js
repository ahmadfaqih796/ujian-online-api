"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    const table = await queryInterface.describeTable("users");
    if (!table.name) {
      await queryInterface.addColumn("users", "name", {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    if (!table.nik) {
      await queryInterface.addColumn("users", "nik", {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    if (!table.umur) {
      await queryInterface.addColumn("users", "umur", {
        type: Sequelize.STRING,
        allowNull: true,
        after: "name",
      });
    }
    if (!table.kelas) {
      await queryInterface.addColumn("users", "kelas", {
        type: Sequelize.STRING,
        allowNull: true,
        after: "umur",
      });
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
