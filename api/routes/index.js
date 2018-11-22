'use strict';

module.exports = (app) => {
  //Router path
  const exempleRoutes = require("./exempleRoutes");
  const userRoutes  = require("./userRoutes");
  const friendRoutes  = require("./friendRoutes");
  const postRoutes  = require("./postRoutes");
  const grupoRoutes  = require("./grupoRoutes");
  const profileRoutes  = require("./profileRoutes");

  // Other route groups could go here, in the future

  app.use('/', exempleRoutes);
  app.use('/user', userRoutes);
  app.use('/friends', friendRoutes);
  app.use('/post', postRoutes);
  app.use('/grupo', grupoRoutes);
  app.use('/profile', profileRoutes);
};