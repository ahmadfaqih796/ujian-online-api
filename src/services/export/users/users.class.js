/* eslint-disable no-unused-vars */

const errors = require("@feathersjs/errors");
const ExcelJs = require("exceljs");

exports.Users = class Users {
  constructor(options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = app;
  }

  normalizeData(data) {
    if (!Array.isArray(data)) return;
    const newData = [];

    for (let i = 0; i < data.length; i++) {
      const element = {
        no: i + 1,
        name: data[i].nama_guru ?? "-",
        nip: data[i]?.nip ?? "-",
        role: data[i]?.user_data?.role ?? "-",
        email: data[i]?.user_data?.email ?? "-",
        photo: data[i]?.photo ?? "-",
      };
      newData.push(element);
    }

    return newData;
  }

  async create(data, params) {
    try {
      const sequelize = this.app.get("sequelizeClient");
      const { users, guru } = sequelize.models;
      const { role } = data;

      const getUsers = await guru.findAll({
        attributes: ["id_guru", "nama_guru", "nip", "photo"],
        order: [["nama_guru", "ASC"]],
        include: [
          {
            model: users,
            as: "user_data",
            attributes: ["role", "email", "createdAt"],
          },
        ],
        nested: true,
        raw: true,
      });

      const result = this.normalizeData(getUsers);

      const columns = [
        {
          header: "No",
          key: "no",
          width: 5,
        },
        {
          header: "name",
          key: "name",
          width: 30,
        },
        {
          header: "NIP",
          key: "nip",
          width: 15,
        },
        {
          header: "role",
          key: "role",
          width: 10,
        },
        {
          header: "photo",
          key: "photo",
          width: 30,
        },
      ];

      const workbook = new ExcelJs.Workbook();
      workbook.creator = "AHMAD FAQIH ARIFIN";
      workbook.title = "Laporan";
      // workbook.lastModifiedBy = "Faqih";
      workbook.created = new Date();
      workbook.modified = new Date();
      // workbook.lastPrinted = new Date(2016, 9, 27);
      const worksheet = workbook.addWorksheet("users");
      worksheet.columns = columns;

      worksheet.addRows(result);

      return { workbook };
    } catch (error) {
      console.log(error);
      throw new errors.GeneralError(error.message);
    }
  }
};
