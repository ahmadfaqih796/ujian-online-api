// Initializes the `excel-soal` service on path `/excel-soal`
const { ExcelSoal } = require("./excel-soal.class");
const hooks = require("./excel-soal.hooks");
const multer = require("multer");
const mime = require("mime-types");

// Konfigurasi multer untuk menerima hanya file Excel
const upload = multer({
  fileFilter: function (req, file, cb) {
    const fileExt = mime.extension(file.mimetype);
    if (fileExt === "xlsx" || fileExt === "xls") {
      cb(null, true);
    } else {
      cb(new Error("File harus dalam format Excel"));
    }
  },
});

module.exports = function (app) {
  const options = {
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use("/excel-soal", upload.single("file"), new ExcelSoal(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("excel-soal");

  service.hooks(hooks);
};
