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

    const table = await queryInterface.describeTable("guru");
    if (!table.nama_guru) {
      await queryInterface.addColumn("guru", "nama_guru", {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    if (!table.nis) {
      await queryInterface.addColumn("guru", "nis", {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    if (!table.umur) {
      await queryInterface.addColumn("guru", "umur", {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    if (!table.kelas) {
      await queryInterface.addColumn("guru", "kelas", {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    if (!table.kelamin) {
      await queryInterface.addColumn("guru", "kelamin", {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    if (!table.agama) {
      await queryInterface.addColumn("guru", "agama", {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    if (!table.tempat_lahir) {
      await queryInterface.addColumn("guru", "tempat_lahir", {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    if (!table.tanggal_lahir) {
      await queryInterface.addColumn("guru", "tanggal_lahir", {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    if (!table.alamat) {
      await queryInterface.addColumn("guru", "alamat", {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    if (!table.no_telepon) {
      await queryInterface.addColumn("guru", "no_telepon", {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    if (!table.photo) {
      await queryInterface.addColumn("guru", "photo", {
        type: Sequelize.STRING,
        allowNull: true,
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
