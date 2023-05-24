const orderControoler = require("../controllers/payment-controller");
const express = require("express");

const router = express.Router();

router.post("/", orderControoler.createPayment);
module.exports = router;
