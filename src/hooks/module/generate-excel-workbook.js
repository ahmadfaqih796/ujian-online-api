// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async function generateExcelPrices(_, res, next) {
    const { workbook } = res.data;

    if (!workbook) return next();

    res.setHeader("content-type", [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ]);

    await workbook.xlsx.write(res);

    res.end();
  };
};
