/* eslint-disable no-unused-vars */
exports.Dashboard = class Dashboard {
  constructor(options) {
    this.options = options || {};
  }
  setup(app) {
    this.app = app;
  }
  async find(params) {
    return [];
  }

  async get(id, params) {
    return {
      id,
      text: `A new message with ID: ${id}!`,
    };
  }
};
