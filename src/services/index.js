const users = require('./users/users.service.js');
const soal = require('./soal/soal.service.js');
const kelas = require('./kelas/kelas.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(soal);
  app.configure(kelas);
};
