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
        // nik: data[i].nik ?? "-",
        name: data[i].name ?? "-",
        role: data[i]?.role ?? "-",
        email: data[i]?.email ?? "-",
        photo: data[i]?.user_guru?.photo ?? "-",
        // position: data[i]?.job_position?.name ?? "-",
        // level: data[i]?.job_level?.name ?? "-",
        // employee_type: data[i]?.employee_type?.name ?? "-",
        // location: data[i]?.location_point?.name ?? "-",
        // join_date: data[i].created_at ?? "-",
      };
      newData.push(element);
    }

    return newData;
  }

  async find(params) {
    const sequelize = this.app.get("sequelizeClient");
    const {
      users,
      guru,
      job_level,
      job_position,
      employee_type,
      location_point,
    } = sequelize.models;
    const {
      nik,
      company_id,
      departement,
      position,
      level,
      join_date,
      employee,
      location,
      name,
      role,
    } = params.query;

    // if (!company_id)
    //   throw new errors.BadRequest("Params company_id must be fullfield");

    const getUsers = await users.findAll({
      attributes: ["role", "name", "email", "createdAt"],
      where: {
        // ...(nik && {
        //   nik: nik,
        // }),
        ...(name && {
          name: {
            $like: `%${name}%`,
          },
        }),
        ...(role && {
          role: role,
        }),
      },
      include: [
        {
          model: guru,
          as: "user_guru",
          attributes: ["nama_guru", "photo"],
          ...(departement && {
            where: {
              id: departement,
            },
          }),
        },
        // {
        //   model: job_level,
        //   as: "job_level",
        //   attributes: ["name"],
        //   ...(level && {
        //     where: {
        //       id: level,
        //     },
        //   }),
        // },
      ],
      nested: true,
      // raw: true,
    });

    const result = this.normalizeData(getUsers);

    const columns = [
      {
        header: "Nik",
        key: "nik",
        width: 15,
      },
      {
        header: "name",
        key: "name",
        width: 30,
      },
      {
        header: "role",
        key: "role",
        width: 30,
      },
      {
        header: "photo",
        key: "photo",
        width: 30,
      },
      // {
      //   header: "Departemen",
      //   key: "departement",
      //   width: 20,
      // },
      // {
      //   header: "Posisi",
      //   key: "position",
      //   width: 20,
      // },
      // {
      //   header: "Tipe Karyawan",
      //   key: "employee_type",
      // },
      // {
      //   header: "Lokasi Kerja",
      //   key: "location",
      // },
      // {
      //   header: "Tanggal Register",
      //   key: "join_date",
      //   width: 15,
      // },
    ];

    const workbook = new ExelJs.Workbook();
    const worksheet = workbook.addWorksheet("users");
    worksheet.columns = columns;

    // worksheet.getColumn("location").width = result.map((item) => {
    //   const maxLength = Math.max(item?.location?.length) ?? 15;
    //   return maxLength;
    // })[0];

    worksheet.addRows(result);

    return { workbook };
  }
};
