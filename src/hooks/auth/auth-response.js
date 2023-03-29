// eslint-disable-next-line no-unused-vars
const errors = require("@feathersjs/errors");
module.exports = () => {
  return async (context) => {
    const { user, accessToken } = context.result;
    delete context.result.authentication;

    context.result = {
      user,
      accessToken,
    };

    //  if (!context.result.user.isVerified) {
    //    // eslint-disable-next-line quotes
    //    throw new errors.Conflict("User is not approved by admin");
    //  }
    return context;
  };
};
