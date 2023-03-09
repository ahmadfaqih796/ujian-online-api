const errors = require("@feathersjs/errors");
const { Service } = require("feathers-sequelize");

exports.Users = class Users extends Service {
  async create(data, params) {
    // This is the information we want from the user signup data
    const { email, password, name, nik } = await data;
    // Use the existing avatar image or return the Gravatar for the email
    //  const avatar = data.avatar || getGravatar(email);
    // The complete user
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
      nik,
    };
    return {
      message: "Berhasil membuat akun",
      user: userData,
    };
  }
};
