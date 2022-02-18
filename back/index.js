//jshint esversion: 9
require("dotenv").config();
const express = require("express");
const { PORT, NODE_ENV } = require("./config");
const app = express();

app.get("/", (request, response) => {
    response.send("Hello");
});

app.listen(PORT, () => {
    console.log(`${NODE_ENV} server is running on port ${PORT}`);
});
