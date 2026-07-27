const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express(); // creates a express application

app.use(express.json()); // converts  json to javascript object

app.use(cors()); // allow to req from any http

app.use(cookieParser()); // allows express app to read cookies

module.exports = app;
