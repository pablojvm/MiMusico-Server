function config(app) {
  const express = require("express");
  const cors = require("cors");
  const morgan = require("morgan");

  app.set("trust proxy", 1);
  app.use(morgan("dev"));

  // Permitimos un origin desde la variable de entorno y un fallback local
  const allowedOrigins = [
    process.env.ORIGIN,
    "http://localhost:5173",
    "http://localhost:3000",
  ].filter(Boolean);

  app.use(
    cors({
      origin: function (origin, callback) {
        // permitir Postman / curl (sin origin) y los origins permitidos
        if (!origin || allowedOrigins.includes(origin)) {
          return callback(null, true);
        }
        return callback(new Error(`Origen no permitido por CORS: ${origin}`));
      },
      credentials: true,
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
}

module.exports = config;
