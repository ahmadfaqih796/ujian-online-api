const users = require('./users/users.service.js');
const soal = require('./soal/soal.service.js');
const kelas = require('./kelas/kelas.service.js');
const siswa = require('./siswa/siswa.service.js');
const pelajaran = require('./pelajaran/pelajaran.service.js');
const guru = require('./guru/guru.service.js');
const upload = require('./upload/upload.service.js');
const exportUsers = require('./export/users/users.service.js');
const admin = require('./admin/admin.service.js');
const excelSoal = require('./excel-soal/excel-soal.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(soal);
  app.configure(kelas);
  app.configure(siswa);
  app.configure(pelajaran);
  app.configure(guru);
  app.configure(upload);
  app.configure(exportUsers);
  app.configure(admin);
  app.configure(excelSoal);
};
