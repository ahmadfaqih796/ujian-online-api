const { authenticate } = require("@feathersjs/authentication").hooks;
const { disablePagination } = require("feathers-hooks-common");
const includeUser = require("../../hooks/includes/include-user");

const handleReadUser = () => {
  return async (context) => {
    const { app, params } = context;
    const sequelize = app.get("sequelizeClient");
    const { messages } = sequelize.models;
    const { id_sender, id_receiver } = params.query;
    try {
      const res = await messages.update(
        {
          is_read: 1,
        },
        {
          where: {
            id_sender: id_sender,
            id_receiver: id_receiver,
          },
        }
      );
      context.result = {
        message: "Berhasil Read Data",
        total_read: res,
      };
    } catch (error) {
      console.log("error", error);
      throw new Error("error data");
    }
    return context;
  };
};

module.exports = {
  before: {
    all: [
      // authenticate("jwt")
    ],
    find: [disablePagination(), includeUser()],
    get: [disablePagination(), includeUser()],
    create: [],
    update: [],
    patch: [handleReadUser()],
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
