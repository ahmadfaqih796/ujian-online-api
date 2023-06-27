const fs = require("fs");
const path = require("path");

exports.readSQLFile = (pathToSQL) => {
  try {
    const sqlString = fs.readFileSync(
      path.join(__dirname, `../sql/${pathToSQL}.sql`),
      {
        encoding: "utf8",
      }
    );
    return sqlString;
  } catch (error) {
    throw new Error(error.message);
  }
};
