const {
  AuthenticationService,
  JWTStrategy,
} = require("@feathersjs/authentication");
const { LocalStrategy } = require("@feathersjs/authentication-local");
const { expressOauth } = require("@feathersjs/authentication-oauth");
const authResponse = require("../src/hooks/auth/auth-response");
const invalidAuth = require("../src/hooks/auth/invalid-auth");

module.exports = (app) => {
  const authentication = new AuthenticationService(app);

  authentication.register("jwt", new JWTStrategy());
  authentication.register("local", new LocalStrategy());

  app.use("/authentication", authentication);
  app.configure(expressOauth());

  const service = app.service("authentication");

  service.hooks({
    after: {
      create: [authResponse()],
    },
    error: {
      create: [invalidAuth()],
    },
  });
};
