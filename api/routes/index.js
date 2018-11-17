'use strict';

module.exports = (app) => {
  const exempleRoutes = require("./exempleRoutes");
  app.use('/exemple', exempleRoutes);
  // Other route groups could go here, in the future
};