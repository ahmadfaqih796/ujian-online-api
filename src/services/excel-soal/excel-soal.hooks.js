const fs = require("fs");
const xlsx = require("xlsx");
const uploadExcel = () => {
  return async (context) => {
    const { file } = context.data; // File Excel yang diupload

    console.log("ssss", context.data);
    // Simpan file Excel di direktori temporer
    const filePath = "/path/to/temp/directory/" + file.name;
    await fs.promises.writeFile(filePath, file.data);

    // Baca file Excel
    const workbook = xlsx.readFile(filePath);

    // Ambil data dari sheet pertama (Sheet 1)
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

    // Hapus file Excel dari direktori temporer
    await fs.promises.unlink(filePath);

    return jsonData;
    // const file = context.params.file;
    // const uri = dauria.getBase64DataURI(file.buffer, file.mimetype);
    // context.data = { uri };
    // return context;
  };
};

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [uploadExcel()],
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
