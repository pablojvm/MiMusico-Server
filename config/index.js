function config(app) {
  const express = require("express");
  const logger = require("morgan");
  const cors = require("cors");
  const morgan = require("morgan")

  app.set("trust proxy", 1);
  app.use(morgan("dev"))
  app.use(cors({ origin: [process.env.ORIGIN] }));
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
}

module.exports = config;
