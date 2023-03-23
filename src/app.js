// const { sequelize } = require("./models");
// sequelize.sync({ force: true });
// // sequelize.sync({ alter: true });

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const chalk = require("chalk");

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server running on port: ${port}`));
