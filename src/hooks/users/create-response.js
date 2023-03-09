const errors = require("@feathersjs/errors");

module.exports = () => {
  return async (context) => {
    console.log("dataaaa", context);
    const { result, app } = context;
    throw new errors.BadRequest(context);
    //   delete context.result.authentication;
    const isEmailValid = await app.service("users").Model.findOne({
      where: {
        email: email,
      },
    });
    return context;
  };
};
