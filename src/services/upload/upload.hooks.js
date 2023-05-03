const dauria = require("dauria");

const uploadInterceptors = () => {
  return async (context) => {
    const file = context.params.file;
    const uri = dauria.getBase64DataURI(file.buffer, file.mimetype);
    context.data = { uri };
    return context;
  };
};

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [uploadInterceptors()],
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
