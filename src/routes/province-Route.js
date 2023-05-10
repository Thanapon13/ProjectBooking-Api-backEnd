const express = require("express");
const provinceController = require("../controllers/province-controller");

const router = express.Router();

router.get("/getprovince", provinceController.getProvince);

module.exports = router;
