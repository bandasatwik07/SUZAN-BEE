require("dotenv").config();
const express = require("express");
const app = express();
const http = require('http');

require("./startup/index.startup")(app);

const keepServerAlive = () => {
  setInterval(() => {
    http.get(process.env.SERVER_URL, (res) => {
      console.log(`Pinged server with status: ${res.statusCode}`);
    }).on('error', (err) => {
      console.error(`Failed to ping server: ${err.message}`);
    });
  }, 5 * 60 * 1000);
};

keepServerAlive();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
