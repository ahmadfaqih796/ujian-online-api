const errors = require("@feathersjs/errors");
const { Service } = require("feathers-sequelize");

exports.Users = class Users extends Service {
  async create(data, params) {
    const { email, password, name, nik } = await data;
    if (email === "") {
      throw new errors.BadRequest("email tidak boleh kosong");
    }
    if (password === "") {
      throw new errors.BadRequest("password tidak boleh kosong");
    }
    if (nik === "") {
      throw new errors.BadRequest("nik tidak boleh kosong");
    }
    const userData = {
      email,
      name,
      password,
      nik,
    };
    super.create(userData, params);
    return {
      message: "Berhasil membuat akun",
      user: userData,
    };
  }
};
