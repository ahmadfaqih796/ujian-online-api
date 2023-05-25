const { Service } = require("feathers-sequelize");
const readXlsxFile = require("read-excel-file/node");

const errors = require("@feathersjs/errors");

exports.Soal = class Soal extends Service {
  async create(data, params) {
    const schema = {
      SOAL: {
        // JSON object property name.
        prop: "pertanyaan",
        type: Date,
      },
      A: {
        prop: "pilihan_a",
        type: Number,
        required: true,
      },
      // Nested object example.
      // 'COURSE' here is not a real Excel file column name,
      // it can be any string — it's just for code readability.
      B: {
        // Nested object path: `row.course`
        prop: "pilihan_b",
        // Nested object schema:
        type: {
          "IS FREE": {
            prop: "isFree",
            type: Boolean,
          },
          "COURSE TITLE": {
            prop: "title",
            type: String,
          },
        },
      },
      CONTACT: {
        prop: "contact",
        required: true,
        // A custom `type` can be defined.
        // A `type` function only gets called for non-empty cells.
        type: (value) => {
          const number = parsePhoneNumber(value);
          if (!number) {
            throw new Error("invalid");
          }
          return number;
        },
      },
      STATUS: {
        prop: "status",
        type: String,
        oneOf: ["SCHEDULED", "STARTED", "FINISHED"],
      },
    };

    readXlsxFile(file, { schema }).then(({ rows, errors }) => {
      // `errors` list items have shape: `{ row, column, error, reason?, value?, type? }`.
      errors.length === 0;

      rows ===
        [
          {
            date: new Date(2018, 2, 24),
            numberOfStudents: 10,
            course: {
              isFree: true,
              title: "Chemistry",
            },
            contact: "+11234567890",
            status: "SCHEDULED",
          },
        ];
    });
    try {
      // File path.
      readXlsxFile("/path/to/file").then((rows) => {
        // `rows` is an array of rows
        // each row being an array of cells.
      });
      throw new errors.BadRequest("hahahah");
      console.log("masuk pak eko", data);
      return data;
    } catch (error) {
      console.log(error);
      throw new errors.GeneralError(error.message);
    }
  }
};
