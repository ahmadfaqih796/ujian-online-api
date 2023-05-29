const { authenticate } = require("@feathersjs/authentication").hooks;

const { hashPassword, protect } =
  require("@feathersjs/authentication-local").hooks;
const createUser = require("../../hooks/users/create-user");
const includeUserSiswa = require("../../hooks/users/include-user-siswa");
const includeUserGuru = require("../../hooks/users/include-user-guru");
const includeUserAdmin = require("../../hooks/users/include-user-admin");

module.exports = {
  before: {
    all: [],
    find: [
      authenticate("jwt"),
      includeUserSiswa(),
      includeUserGuru(),
      includeUserAdmin(),
    ],
    get: [
      authenticate("jwt"),
      includeUserSiswa(),
      includeUserGuru(),
      includeUserAdmin(),
    ],
    create: [hashPassword("password")],
    update: [hashPassword("password"), authenticate("jwt")],
    patch: [hashPassword("password"), authenticate("jwt")],
    remove: [authenticate("jwt")],
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect("password"),
    ],
    find: [],
    get: [],
    create: [createUser()],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
