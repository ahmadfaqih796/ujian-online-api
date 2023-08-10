const { authenticate } = require("@feathersjs/authentication").hooks;
const { disablePagination } = require("feathers-hooks-common");

const handleDeleteMultiple = () => {
  return async (context) => {
    const { app, params } = context;
    const sequelize = app.get("sequelizeClient");
    const { soal } = sequelize.models;
    const { id_soal } = params.query;

    if (!params.query || !id_soal) {
      throw new Error("data soal tidak boleh kosong");
    }

    const idSoal = id_soal.split(",");
    try {
      for (const id of idSoal) {
        await soal.destroy({
          where: { id_soal: id },
        });
      }
      context.result = { message: "Delete Successful", id_soal: idSoal };
    } catch (error) {
      console.log("errrrrr", error);
      throw error;
    }

    return context;
  };
};

module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [disablePagination()],
    get: [disablePagination()],
    create: [],
    update: [],
    patch: [],
    remove: [handleDeleteMultiple()],
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
