//middlewares
const express = require("express");
const morgan = require("morgan"); // for consoling api request calls
const helmet = require("helmet"); // secures connection by adding additional header
const cors = require("cors"); // handling cors errors
var session = require("express-session");

//Routers
const { UserRouter } = require("../routes/user.routes.js");

module.exports = (app) => {

  var corsOptions = {
    origin: process.env.CLIENT_APP_URL, // CLIENT_APP_URL=http://localhost:3000, Declare this in .env file
    optionsSuccessStatus: 200,
  };

  app.use(express.json({ limit: "9999000009mb" })); // body parser, parses request body
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });
  app.use(express.urlencoded({ extended: true })); // parses encoded url
  app.use(morgan("tiny")); // initiating console api requests
  app.use(helmet());
  app.use(cors(corsOptions));

  app.use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true },
    })
  );

  //start of routes
  app.use("/api/users", UserRouter);


  //handling async errors in apis
//   app.use(ErrorHandler);

  //adding additional apis
  app.get("/", (req, res) =>
    res.send({
      error: false,
      message: "SUZAN SERVER IS LIVE!",
      result: null,
    })
  );
  app.get("*", (req, res) =>
    res
      .status(404)
      .send({ error: true, message: "Route not Found!", result: null })
  );
};

console.log("🛣️  Routes setup completed");
