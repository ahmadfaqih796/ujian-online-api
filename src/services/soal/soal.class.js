const { Service } = require("feathers-sequelize");
const readXlsxFile = require("read-excel-file/node");

const errors = require("@feathersjs/errors");

exports.Soal = class Soal extends Service {
  async create(data, params) {
    try {
      console.log("masuk pak eko", data);
      return data;
    } catch (error) {
      console.log(error);
      throw new errors.GeneralError(error.message);
    }
  }
};
