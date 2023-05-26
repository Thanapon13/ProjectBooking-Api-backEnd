const paymentControoler = require("../controllers/payment-controller");
const express = require("express");

const router = express.Router();

router.post("/", paymentControoler.createPayment);
module.exports = router;
