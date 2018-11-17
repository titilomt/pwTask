'use strict';

module.exports = (app) => {
  //Router path
  const exempleRoutes = require("./exempleRoutes");
  const loginRoutes   = require("./loginRoutes");
  const signupRoutes  = require("./signupRoutes");
  
  // Other route groups could go here, in the future
  app.use('/exemple', exempleRoutes);
  app.use('/login', loginRoutes);
  app.use('/signup', signupRoutes);
};