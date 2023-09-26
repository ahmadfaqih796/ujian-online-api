const { authenticate } = require("@feathersjs/authentication").hooks;
const { disablePagination } = require("feathers-hooks-common");

const { hashPassword, protect } =
  require("@feathersjs/authentication-local").hooks;
const {
  addVerification,
  removeVerification,
} = require("feathers-authentication-management");

const {
  disallow,
  iff,
  isProvider,
  preventChanges,
} = require("feathers-hooks-common");

const createUser = require("../../hooks/users/create-user");
const validationUser = require("../../hooks/users/validation-user");
const includeUserSiswa = require("../../hooks/users/include-user-siswa");
const includeUserGuru = require("../../hooks/users/include-user-guru");
const includeUserAdmin = require("../../hooks/users/include-user-admin");

const generatePasssword = () => {
  return async (context) => {
    const { data } = context;
    if (!data.password) {
      const generatePassword = randomstring.generate({
        length: 8,
        charset: "alphanumeric",
      });

      //save to params
      context.params.normalPasssword = generatePassword;

      // save to data
      context.data.password = generatePassword;
      return context;
    }

    return context;
  };
};

module.exports = {
  before: {
    all: [],
    find: [
      disablePagination(),
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
    create: [
      hashPassword("password"),
      validationUser(),
      addVerification("auth-management"),
    ],
    update: [
      hashPassword("password"),
      authenticate("jwt"),
      disallow("external"),
    ],
    patch: [
      authenticate("jwt"),
      iff(
        isProvider("external"),
        preventChanges(
          true,
          "email",
          "isVerified",
          "resetExpires",
          "resetShortToken",
          "resetToken",
          "verifyChanges",
          "verifyExpires",
          "verifyShortToken",
          "verifyToken"
        ),
        hashPassword("password")
      ),
    ],
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
    create: [createUser(), removeVerification()],
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
