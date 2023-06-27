const { readSQLFile } = require("../../utils/query-helper");
const { QueryTypes } = require("sequelize");

/* eslint-disable no-unused-vars */
exports.Dashboard = class Dashboard {
  constructor(options) {
    this.options = options || {};
  }
  setup(app) {
    this.app = app;
  }
  async find(params) {
    const sequelize = this.app.get("sequelizeClient");
    const SQL_FILE = readSQLFile("count-user-by-role");
    const usersData = await sequelize.query(SQL_FILE, {
      type: QueryTypes.SELECT,
    });

    const result = {
      users_data: usersData,
    };

    return result;
  }

  async get(id, params) {
    return {
      id,
      text: `A new message with ID: ${id}!`,
    };
  }
};
