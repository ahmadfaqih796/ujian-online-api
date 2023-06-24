const { authenticate } = require("@feathersjs/authentication").hooks;
const includeUser = require("../../hooks/includes/include-user");

module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [includeUser()],
    get: [includeUser()],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
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
