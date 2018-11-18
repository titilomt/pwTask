'use strict';

module.exports = (app) => {
  //Router path
  const exempleRoutes = require("./exempleRoutes");
  const loginRoutes   = require("./loginRoutes");
  const signupRoutes  = require("./signupRoutes");
  const friendRoutes  = require("./friendRoutes");

  // Other route groups could go here, in the future

  app.use('/', exempleRoutes);
  app.use('/login', loginRoutes);
  app.use('/signup', signupRoutes);
  app.use('/friends', friendRoutes);
};