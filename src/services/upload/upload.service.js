// Initializes the `uploads` service on path `/uploads`
const hooks = require("./upload.hooks");
const multer = require("multer");
const fs = require("fs-blob-store");
const blobService = require("feathers-blob");
const blobStorage = fs("./public/uploads");

const whitelist = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

const multipartMiddleware = multer({
  // limits: {
  //   fileSize: 1 * 1024 * 1024, // for 1MB
  // },
  fileFilter: (req, file, cb) => {
    if (!whitelist.includes(file.mimetype)) {
      return cb(new Error("file is not allowed"));
    }

    cb(null, true);
  },
});

module.exports = function (app) {
  // Initialize our service with any options it requires
  app.use(
    "/upload",
    multipartMiddleware.single("uri"),

    (req, res, next) => {
      req.feathers.file = req.file;
      next();
    },

    blobService({ Model: blobStorage, returnUri: false })
  );

  // Get our initialized service so that we can register hooks
  const service = app.service("upload");

  service.hooks(hooks);
};
