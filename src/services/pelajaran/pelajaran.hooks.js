const { authenticate } = require("@feathersjs/authentication").hooks;

const handleChildren = () => {
  return async (context) => {
    const { app, data, result } = context;
    const sequelize = app.get("sequelizeClient");
    const { soal } = sequelize.models;
    if (data && data.question) {
      const sidebarItems = data.question.map((item) => ({
        ...item,
        id_pelajaran: result.id,
      }));
      await soal.bulkCreate(sidebarItems);
    }
    return context;
  };
};

const handleDeleteChildren = () => {
  return async (context) => {
    const { app, id } = context;
    const sequelize = app.get("sequelizeClient");
    const { soal } = sequelize.models;
    const itemCount = await soal.count({ where: { id_pelajaran: id } });
    if (itemCount > 0) {
      await soal.destroy({ where: { id_pelajaran: id } });
    }
    return context;
  };
};

module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [handleDeleteChildren()],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [handleChildren()],
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
