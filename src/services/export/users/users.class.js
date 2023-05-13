/* eslint-disable no-unused-vars */

const errors = require("@feathersjs/errors");
const ExelJs = require("exceljs");

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
        name: data[i].name ?? "-",
        nip: data[i]?.user_guru?.nip ?? "-",
        role: data[i]?.role ?? "-",
        email: data[i]?.email ?? "-",
        photo: data[i]?.user_guru?.photo ?? "-",
      };
      newData.push(element);
    }

    return newData;
  }

  async find(params) {
    const sequelize = this.app.get("sequelizeClient");
    const { users, guru } = sequelize.models;
    const { name, role } = params.query;

    // if (!company_id)
    //   throw new errors.BadRequest("Params company_id must be fullfield");

    const getUsers = await users.findAll({
      attributes: ["role", "name", "email", "createdAt"],
      where: {
        ...(name && {
          name: {
            $like: `%${name}%`,
          },
        }),
        ...(role && {
          role: role,
        }),
      },
      order: [["name", "ASC"]],
      include: [
        {
          model: guru,
          as: "user_guru",
          attributes: ["nama_guru", "nip", "photo"],
        },
      ],
      // nested: true,
      // raw: true,
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

    const workbook = new ExelJs.Workbook();
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
  }
};
